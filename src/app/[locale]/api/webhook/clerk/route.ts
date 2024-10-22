// src/app/api/webhook/clerk/route.ts
/* eslint-disable camelcase */
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";

import { addMemberToCommunity, createCommunity, deleteCommunity, removeUserFromCommunity, updateCommunityInfo, updateCommunityBio } from "@/components/cyber-rant/lib/actions/community.actions";

type EventType =
  | "organization.created"
  | "organizationInvitation.created"
  | "organizationMembership.created"
  | "organizationMembership.deleted"
  | "organization.updated"
  | "organization.bioUpdated"
  | "organization.deleted";

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const header = await headers();
  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };

  // Activitate Webhook in the Clerk Dashboard.  After adding the endpoint, you'll see the secret on the right side.
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");
  let evnt: Event | null = null;
  try {
    evnt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType | undefined = evnt ? evnt.type : undefined;

  if (!eventType) {
    return NextResponse.json({ message: "Invalid event type" }, { status: 400 });
  }

  // Listen organization creation event
  if (eventType === "organization.created") {
    const { id, name, slug, logo_url, image_url, bio, created_by } = evnt?.data ?? {};
    try {
      // @ts-expect-error: Suppressing type error due to potential mismatched types in createCommunity parameters
      await createCommunity(id, name, slug, logo_url || image_url, bio, created_by);
      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organization.created): Internal Server Error" }, { status: 500 });
    }
  }

  // Listen organization invitation creation event. Just to show. You can avoid this or tell people that we can create a new mongoose action and add pending invites in the database.
  if (eventType === "organizationInvitation.created") {
    try {
      console.log("Invitation created", evnt?.data);
      return NextResponse.json({ message: "Invitation created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organizationInvitation.created): Internal Server Error" }, { status: 500 });
    }
  }

  // Listen organization membership (member invite & accepted) creation
  if (eventType === "organizationMembership.created") {
    try {
      const { organization, public_user_data } = evnt?.data;
      console.log("created", evnt?.data);
      // @ts-expect-error: Suppressing type error due to potential mismatched types in addMemberToCommunity parameters
      await addMemberToCommunity(organization.id, public_user_data.user_id);
      return NextResponse.json({ message: "Invitation accepted" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organizationMembership.created): Internal Server Error" }, { status: 500 });
    }
  }

  // Listen member deletion event
  if (eventType === "organizationMembership.deleted") {
    try {
      const { organization, public_user_data } = evnt?.data;
      console.log("removed", evnt?.data);
      // @ts-expect-error: Suppressing type error due to potential mismatched types in removeUserFromCommunity parameters
      await removeUserFromCommunity(public_user_data.user_id, organization.id);
      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organizationMembership.deleted): Internal Server Error" }, { status: 500 });
    }
  }

  // Listen organization updation event
  if (eventType === "organization.updated") {
    try {
      const { id, logo_url, name, slug, bio } = evnt?.data;
      console.log("updated", evnt?.data);
      // @ts-expect-error: Suppressing type error due to potential mismatched types in updateCommunityInfo parameters
      await updateCommunityInfo(id, name, slug, logo_url, bio);
      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organization.updated): Internal Server Error" }, { status: 500 });
    }
  }

  if (eventType === "organization.bioUpdated") {
    try {
      const { id, newBio } = evnt?.data;
      console.log("bio updated", evnt?.data);
      // @ts-expect-error: Suppressing type error due to potential mismatched types in updateCommunityBio parameters
      await updateCommunityBio(id, newBio);
      return NextResponse.json({ message: "Bio updated" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organization.bioUpdated): Internal Server Error" }, { status: 500 });
    }
  }

  // Listen organization deletion event
  if (eventType === "organization.deleted") {
    try {
      const { id } = evnt?.data;
      console.log("deleted", evnt?.data);
      // @ts-expect-error: Suppressing type error due to potential mismatched types in deleteCommunity parameters
      await deleteCommunity(id);

      return NextResponse.json({ message: "Organization deleted" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "/api/webhook/clerk (organization.deleted): Internal Server Error" }, { status: 500 });
    }
  }
};
