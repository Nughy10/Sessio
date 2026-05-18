import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, name, language } = await request.json();

    if (!email || !name) {
      return Response.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    const lang = language || 'es';

    const content = {
      es: {
        subject: '¡Bienvenido al acceso anticipado de Sessio!',
        html: `
          <h2>¡Hola ${name}!</h2>
          <p>Eres parte de los primeros 100 coaches con acceso anticipado a Sessio.</p>
          <p><strong>Precio bloqueado: €49/mes de por vida.</strong></p>
          <p>Te notificaremos cuando lancemos la plataforma.</p>
          <p>¡Gracias por ser parte de la revolución de retención!</p>
        `,
      },
      en: {
        subject: 'Welcome to Sessio Early Access!',
        html: `
          <h2>Hi ${name}!</h2>
          <p>You're part of the first 100 coaches with early access to Sessio.</p>
          <p><strong>Locked pricing: €49/month for life.</strong></p>
          <p>We'll notify you when we launch the platform.</p>
          <p>Thanks for being part of the retention revolution!</p>
        `,
      },
    };

    const email_content = content[lang as keyof typeof content] || content.es;

    const result = await resend.emails.send({
      from: 'info@sessiohq.com',
      to: email,
      subject: email_content.subject,
      html: email_content.html,
    });

    if (result.error) {
      return Response.json(
        { error: 'Error al enviar email' },
        { status: 500 }
      );
    }

    (async () => {
      try {
        await supabase
          .from('early_access_waitlist')
          .insert([{ email, name, created_at: new Date().toISOString() }]);
      } catch {
      }
    })();

    return Response.json(
      { success: true, message: lang === 'en' ? 'Registered! Check your email.' : '¡Registrado! Revisa tu email.' },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { count } = await supabase
      .from('early_access_waitlist')
      .select('*', { count: 'exact', head: true });

    return Response.json({ count: count || 0 }, { status: 200 });
  } catch {
    return Response.json({ count: 0 }, { status: 200 });
  }
}