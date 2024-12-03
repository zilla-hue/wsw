import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, donationType, customAmount } = body;

    // Convert amount to cents for Stripe
    const finalAmount = Math.round((customAmount || amount) * 100);

    // Validate amount
    if (!finalAmount || finalAmount < 100) { // Minimum $1
      return NextResponse.json(
        { error: 'Invalid amount. Minimum donation is $1.' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${donationType || 'One-time'} Donation`,
              description: 'Thank you for supporting When Sinners Worship',
            },
            unit_amount: finalAmount,
          },
          quantity: 1,
        },
      ],
      mode: donationType === 'Monthly' ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/cancel`,
      metadata: {
        donationType: donationType || 'One-time',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}