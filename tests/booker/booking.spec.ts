import { test, expect } from "@playwright/test";
import { z } from "zod";

const bookingIdsSchema = z.array(
    z.object({
        bookingid: z.number(),
    }),
);

test("GET all bookings", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking");
    expect(response.status()).toBe(200);
    console.log(await response.json());
    // verify that the response is an array of objects like [{bookingid: number}]
    const bookings = await response.json();
    expect(() => bookingIdsSchema.parse(bookings)).not.toThrow();

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
    test("GET booking by ID", async ({ request }) => {
        const response = await request.get("https://restful-booker.herokuapp.com/booking/1");
        expect(response.status()).toBe(200);
        const booking = await response.json();
        expect(() => bookingSchema.parse(booking)).not.toThrow();

        const { firstname, lastname } = booking;

        expect(firstname).toBe("Eric");
        expect(lastname).toBe("Jackson");
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

        const response = await request.post("https://restful-booker.herokuapp.com/booking", {
            data: newBookingPayload,
        });

        expect(response.status()).toBe(200);
        const createBookingResponse = await response.json();
        expect(() => newBookingSchema.parse(createBookingResponse)).not.toThrow();
        const { booking } = createBookingResponse;
        expect(booking).toMatchObject(newBookingPayload);
    });

    test("PUT update a booking", async ({ request }) => {
        // get token
        const authResponse = await request.post("https://restful-booker.herokuapp.com/auth", {
            data: {
                username: "admin",
                password: "password123",
            },
        });
        expect(authResponse.status()).toBe(200);
        const authData = await authResponse.json();
        const token = authData.token;

        const updatedBookingPayload = {
            firstname: "Jane",
            lastname: "Smith",
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: "2026-05-01",
                checkout: "2026-05-10",
            },
            additionalneeds: "Late checkout",
        };

        const response = await request.put("https://restful-booker.herokuapp.com/booking/1", {
            data: updatedBookingPayload,
            headers: { Cookie: `token=${token}` },
        });

        expect(response.status()).toBe(200);
        const updatedBookingResponse = await response.json();
        console.log(updatedBookingResponse);
        expect(updatedBookingResponse).toMatchObject(updatedBookingPayload);
    });

    test("PATCH partially update a booking", async ({ request }) => {
        // get token
        const authResponse = await request.post("https://restful-booker.herokuapp.com/auth", {
            data: {
                username: "admin",
                password: "password123",
            },
        });
        expect(authResponse.status()).toBe(200);
        const authData = await authResponse.json();
        const token = authData.token;

        const partialUpdatePayload = {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2025-06-05",
                checkout: "2025-06-07",
            },
            additionalneeds: "Breakfast",
        };

        // list all booking then get the random booking id to update
        const bookingsResponse = await request.get("https://restful-booker.herokuapp.com/booking");
        expect(bookingsResponse.status()).toBe(200);
        const bookings = await bookingsResponse.json();
        const bookingIds = bookings.map((booking: { bookingid: number }) => booking.bookingid);
        const randomBookingId = bookingIds[Math.floor(Math.random() * bookingIds.length)];

        const response = await request.put(`https://restful-booker.herokuapp.com/booking/${randomBookingId}`, {
            data: partialUpdatePayload,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Cookie: `token=${token}`,
            },
        });

        expect(response.status()).toBe(200);
        const updatedBookingResponse = await response.json();
        console.log(updatedBookingResponse);
        expect(updatedBookingResponse.totalprice).toBe(partialUpdatePayload.totalprice);
        expect(updatedBookingResponse.additionalneeds).toBe(partialUpdatePayload.additionalneeds);
    });

    test("DELETE a booking", async ({ request }) => {
        // get token
        const authResponse = await request.post("https://restful-booker.herokuapp.com/auth", {
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
    });
});
