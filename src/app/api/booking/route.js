import { Resend } from 'resend';

export async function POST(request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { fullName, age, city, email, phone, questions, subject, paymentMethod, price } = body;

    // Validate required fields
    if (!fullName || !age || !city || !email || !phone) {
      return Response.json(
        { error: 'Tous les champs obligatoires doivent être remplis.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'your-email@example.com';

    // Send notification email to the business owner
    const { error: ownerEmailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'NextJob <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `Nouvelle demande de consultation - ${fullName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle Demande de Consultation</h1>
            <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">NextJob Morocco</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px;">
            <!-- Client Info -->
            <div style="background: white; border-radius: 8px; padding: 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">Informations du Client</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 140px; font-size: 14px;">Nom complet</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Age</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${age} ans</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Ville</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${city}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Téléphone</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
                </tr>
              </table>
            </div>

            <!-- Consultation Details -->
            <div style="background: white; border-radius: 8px; padding: 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #7c3aed; padding-bottom: 8px;">Détails de la Consultation</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 140px; font-size: 14px;">Objet</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Paiement</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 600; font-size: 14px;">${paymentMethod}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Montant</td>
                  <td style="padding: 8px 0; color: #2563eb; font-weight: 700; font-size: 18px;">${price}</td>
                </tr>
              </table>
            </div>

            ${questions ? `
            <!-- Questions -->
            <div style="background: white; border-radius: 8px; padding: 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 12px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">Questions du Client</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${questions}</p>
            </div>
            ` : ''}

            <!-- Action Required -->
            <div style="background: #fef3c7; border-radius: 8px; padding: 16px; border: 1px solid #fde68a;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                Action requise: Vérifiez la réception du virement bancaire et contactez le client pour confirmer le rendez-vous.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #1e293b; padding: 20px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">NextJob Morocco - Notification automatique</p>
            <p style="color: #64748b; font-size: 11px; margin: 4px 0 0;">${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}</p>
          </div>
        </div>
      `,
    });

    if (ownerEmailError) {
      console.error('Error sending owner notification:', ownerEmailError);
      return Response.json(
        { error: 'Erreur lors de l\'envoi de la notification.' },
        { status: 500 }
      );
    }

    // Optionally send confirmation email to the client
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'NextJob <onboarding@resend.dev>',
        to: [email],
        subject: 'Confirmation de votre demande - NextJob Morocco',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Demande Reçue !</h1>
              <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">NextJob Morocco</p>
            </div>
            <div style="padding: 32px;">
              <p style="color: #1e293b; font-size: 16px; margin: 0 0 16px;">Bonjour <strong>${fullName}</strong>,</p>
              <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                Nous avons bien reçu votre demande de consultation pour la <strong>Préparation de CV professionnel</strong>.
              </p>

              <div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #bfdbfe;">
                <h3 style="color: #1e40af; margin: 0 0 12px; font-size: 16px;">Prochaines étapes :</h3>
                <ol style="color: #1e40af; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Effectuez le virement bancaire de <strong>99 DH</strong></li>
                  <li>Indiquez votre <strong>nom complet</strong> dans la description du virement</li>
                  <li>Nous vous contacterons pour confirmer votre rendez-vous</li>
                </ol>
              </div>

              <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1e293b; margin: 0 0 12px; font-size: 16px;">Informations de virement :</h3>
                <p style="color: #475569; font-size: 14px; margin: 4px 0;"><strong>RIB :</strong> ${process.env.NEXT_PUBLIC_BANK_RIB || '000 000 0000000000 00'}</p>
                <p style="color: #475569; font-size: 14px; margin: 4px 0;"><strong>Titulaire :</strong> ${process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || 'Nom du titulaire du compte'}</p>
                <p style="color: #475569; font-size: 14px; margin: 4px 0;"><strong>Banque :</strong> ${process.env.NEXT_PUBLIC_BANK_NAME || 'Nom de la banque'}</p>
                <p style="color: #2563eb; font-size: 18px; font-weight: 700; margin: 12px 0 0;">Montant : 99 DH</p>
              </div>

              <p style="color: #475569; font-size: 14px; margin: 24px 0 0; line-height: 1.6;">
                Si vous avez des questions, n'hésitez pas à nous contacter.<br>
                Merci pour votre confiance !
              </p>
            </div>
            <div style="background: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">NextJob Morocco</p>
            </div>
          </div>
        `,
      });
    } catch (clientEmailError) {
      // Don't fail the whole request if client email fails
      console.error('Error sending client confirmation:', clientEmailError);
    }

    return Response.json({ success: true, message: 'Demande envoyée avec succès!' });
  } catch (error) {
    console.error('Booking API error:', error);
    return Response.json(
      { error: 'Une erreur interne est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
