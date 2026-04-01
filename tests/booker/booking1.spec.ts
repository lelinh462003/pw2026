import { test, expect } from "@playwright/test";
import { request } from "node:http";
import { z } from "zod";

const bookingIdsSchema = z.array(
    z.object({
        bookingid: z.number(),
    }),
);

const bookingSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    totalprice: z.number(),
    depositpaid: z.boolean(),
    bookingdates: z.object({
        checkin: z.string(),
        checkout: z.string(),
    }),
    additionalneeds: z.string().optional(),
});

test("GET all bookings", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking");
    expect(response.status()).toBe(200);
    // console.log(await response.json());
    const bookings = await response.json();

    expect(() => bookingIdsSchema.parse(bookings)).not.toThrow();
});

test("GET booking by ID", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking/1");
    expect(response.status()).toBe(200);
    const booking = await response.json();
    //console.log(booking);
    expect(() => bookingSchema.parse(booking)).not.toThrow();
    const { firstname, lastname } = booking;
    expect(firstname).toBe("Eric");
    expect(firstname).toBe("Jackson");
});

const newBookingSchema = z.object({
    bookingid: z.number(),
    booking: bookingSchema,
});

test("POST create a new booking", async ({ request }) => {
    const newBookingPayload = {
        firstname: "John",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-04-01",
            checkout: "2026-04-10",
        },
        additionalneeds: "Breakfast",
    };

    const response = await request.post("https://restful-booker.herokuapp.com/booking/", {
        data: newBookingPayload,
    });

    expect(response.status()).toBe(200);
    const createBookingResponse = await response.json();
    expect(() => newBookingSchema.parse(createBookingResponse)).not.toThrow();
    const { booking } = createBookingResponse;
    expect(booking).toMatchObject(newBookingPayload);
});

test("PUT update a booking", async ({ request }) => {
    //get token
    const authResponse = await request.post("https://restful-booker.herokuapp.com/auth/", {
        data: {
            username: "admin",
            password: "password123",
        },
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const token = authData.token;

    const updateBookingPayload = {
        firstname: "Jane",
        lastname: "Smith",
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-05-01",
            checkout: "2026-05-10",
        },
        // depositpaid: {
        //     checkin: "2026-05-01",
        //     checkout: "2026-05-10",
        // },
        additionalneeds: "Late checkout",
    };
    const response = await request.put("https://restful-booker.herokuapp.com/booking/1", {
        data: updateBookingPayload,
        headers: { Cookie: `token=${token}` },
    });

    expect(response.status()).toBe(200);
    const updatedBookingResponse = await response.json();
    console.log(updatedBookingResponse);
    // expect(()=>bookingSchema.parse(updatedBookingResponse)).not.toThrow();
    expect(updatedBookingResponse).toMatchObject(updateBookingPayload);
});

test("PATCH partial update a booking", async ({ request }) => {
    //get token
    const authResponse = await request.post("https://restful-booker.herokuapp.com/auth/", {
        data: {
            username: "admin",
            password: "password123",
        },
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const token = authData.token;

    const partialUpdatePayload = {
        totalprice: 250,
        additionalneeds: "Dinner",
    };

    const response = await request.patch("https://restful-booker.herokuapp.com/booking/1", {
        data: partialUpdatePayload,
        headers: { Cookie: `token=${token}` },
    });

    expect(response.status()).toBe(200);
    const updatedBookingResponse = await response.json();
    console.log(updatedBookingResponse);
    expect(updatedBookingResponse.totalprice).toBe(partialUpdatePayload.totalprice);
    expect(updatedBookingResponse.additionalneeds).toBe(partialUpdatePayload.additionalneeds);
});

test("DELETE a booking", async ({ request }) => {
    //get token
    const authResponse = await request.post("https://restful-booker.herokuapp.com/auth/", {
        data: {
            username: "admin",
            password: "password123",
        },
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const token = authData.token;
    const response = await request.delete("https://restful-booker.herokuapp.com/booking/1", {
        headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(201);
    //verify deletion
    const getResponse = await request.get("https://restful-booker.herokuapp.com/booking/1");
    expect(getResponse.status()).toBe(404);
});
