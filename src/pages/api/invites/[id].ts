import type { APIRoute } from 'astro';
import dbConnect from '../../../lib/db';
import Invite from '../../../models/Invite';
import Rsvp from '../../../models/Rsvp';
import { getSession } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ params, cookies }) => {
  try {
    const session = getSession(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401 });
    }

    await dbConnect();
    const invite = await Invite.findById(params.id);

    if (!invite) {
      return new Response(JSON.stringify({ error: 'Invitation not found.' }), { status: 404 });
    }

    if (invite.creatorId.toString() !== session.userId) {
      return new Response(JSON.stringify({ error: 'Forbidden.' }), { status: 403 });
    }

    return new Response(JSON.stringify(invite), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  try {
    const session = getSession(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401 });
    }

    await dbConnect();
    const invite = await Invite.findById(params.id);

    if (!invite) {
      return new Response(JSON.stringify({ error: 'Invitation not found.' }), { status: 404 });
    }

    if (invite.creatorId.toString() !== session.userId) {
      return new Response(JSON.stringify({ error: 'Forbidden.' }), { status: 403 });
    }

    const data = await request.json();
    
    invite.title = data.title !== undefined ? data.title : invite.title;
    invite.hostName = data.hostName !== undefined ? data.hostName : invite.hostName;
    invite.eventDate = data.eventDate !== undefined ? data.eventDate : invite.eventDate;
    invite.eventTime = data.eventTime !== undefined ? data.eventTime : invite.eventTime;
    invite.locationName = data.locationName !== undefined ? data.locationName : invite.locationName;
    invite.locationAddress = data.locationAddress !== undefined ? data.locationAddress : invite.locationAddress;
    invite.dressCode = data.dressCode !== undefined ? data.dressCode : invite.dressCode;
    invite.rsvpDeadline = data.rsvpDeadline !== undefined ? data.rsvpDeadline : invite.rsvpDeadline;
    invite.images = data.images !== undefined ? data.images : invite.images;
    invite.customFields = data.customFields !== undefined ? data.customFields : invite.customFields;

    await invite.save();

    return new Response(JSON.stringify({ success: true, invite }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  try {
    const session = getSession(cookies);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401 });
    }

    await dbConnect();
    const invite = await Invite.findById(params.id);

    if (!invite) {
      return new Response(JSON.stringify({ error: 'Invitation not found.' }), { status: 404 });
    }

    if (invite.creatorId.toString() !== session.userId) {
      return new Response(JSON.stringify({ error: 'Forbidden.' }), { status: 403 });
    }

    await Invite.findByIdAndDelete(params.id);
    await Rsvp.deleteMany({ inviteId: params.id });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
};
