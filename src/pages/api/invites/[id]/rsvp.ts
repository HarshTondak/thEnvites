import type { APIRoute } from 'astro';
import dbConnect from '../../../../lib/db';
import Invite from '../../../../models/Invite';
import Rsvp from '../../../../models/Rsvp';

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
  try {
    await dbConnect();
    const invite = await Invite.findById(params.id);

    if (!invite) {
      return new Response(JSON.stringify({ error: 'Invitation not found.' }), { status: 404 });
    }

    const { guestName, status, guestCount, notes } = await request.json();

    if (!guestName || !status) {
      return new Response(JSON.stringify({ error: 'Name and status are required.' }), { status: 400 });
    }

    const rsvp = new Rsvp({
      inviteId: invite._id,
      guestName,
      status,
      guestCount: guestCount || 1,
      notes: notes || '',
    });

    await rsvp.save();

    return new Response(JSON.stringify({ success: true, rsvp }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
};
