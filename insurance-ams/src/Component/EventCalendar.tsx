"use client";

import { Description } from "@mui/icons-material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Event 1",
    time: "12:00 PM - 2:00 PM",
    Description: "Progressive Underwriter Meeting ",
  },
  {
    id: 2,
    title: "Event 2",
    time: "2:00 PM - 4:00 PM",
    Description: "David Willis closing meeting ",
  },
  {
    id: 3,
    title: "Event 3",
    time: "4:00 PM - 6:00 PM",
    Description: "Potential Carrier acquisition Zoom Call ",
  },
  {
    id: 4,
    title: "Event 4",
    time: "6:00 PM - 8:00 PM",
    Description: "Send out all quotes for tomorrow ",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md border border-gray-300">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-grey-100 border-t-4 odd:border-t-vividCyan even:border-t-lightCyan"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
