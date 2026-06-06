import type { APIRoute } from 'astro';
import dbConnect from '../../../lib/db';
import Invite from '../../../models/Invite';
import { getSession } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const session = getSession(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    if (!data.templateId || !data.title) {
      return new Response(JSON.stringify({ error: 'Template ID and Title are required.' }), { status: 400 });
    }

    const invite = new Invite({
      creatorId: session.userId,
      templateId: data.templateId,
      title: data.title,
      hostName: data.hostName || '',
      eventDate: data.eventDate || '',
      eventTime: data.eventTime || '',
      locationName: data.locationName || '',
      locationAddress: data.locationAddress || '',
      dressCode: data.dressCode || '',
      rsvpDeadline: data.rsvpDeadline || '',
      images: data.images || [],
      customFields: data.customFields || {},
    });

    await invite.save();

    return new Response(JSON.stringify({ success: true, inviteId: invite._id.toString() }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
};
