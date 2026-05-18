import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, language } = await request.json();

    if (!email || !name) {
      return Response.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    // Detectar idioma (default: ES)
    const lang = language || 'es';

    // Contenido multiidioma
    const content = {
      es: {
        subject: '¡Bienvenido al acceso anticipado de Sessio!',
        html: `
          <h2>¡Hola ${name}!</h2>
          <p>Eres parte de los primeros 100 coaches con acceso anticipado a Sessio.</p>
          <p>Te notificaremos cuando lancemos la plataforma.</p>
          <p>¡Gracias por ser parte de la revolución de retención!</p>
        `,
      },
      en: {
        subject: 'Welcome to Sessio Early Access!',
        html: `
          <h2>Hi ${name}!</h2>
          <p>You're part of the first 100 coaches with early access to Sessio.</p>
          <p>We'll notify you when we launch the platform.</p>
          <p>Thanks for being part of the retention revolution!</p>
        `,
      },
    };

    const email_content = content[lang as keyof typeof content] || content.es;

    // Enviar email con Resend
    const result = await resend.emails.send({
      from: 'noreply@sessiohq.com',
      to: email,
      subject: email_content.subject,
      html: email_content.html,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return Response.json(
        { error: 'Error al enviar email' },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: lang === 'en' ? 'Registered! Check your email.' : '¡Registrado! Revisa tu email.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}