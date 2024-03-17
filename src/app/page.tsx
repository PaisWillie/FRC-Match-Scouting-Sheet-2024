"use client";

import Counter from "@/components/counter";
import Label from "@/components/label";
import { Snackbar } from "@mui/material";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { FiClipboard } from "react-icons/fi";

const AutonCounters: string[] = [
  "Auto Notes in Amp",
  "Auto Notes in Speaker",
  "Auto Notes Dropped",
];

const TeleopCounters: string[] = [
  "Notes in Amp",
  "Notes in Speaker",
  "Notes in Amped Speaker",
  "Notes Dropped",
  "Defence Performed",
];

const endGameCounters: string[] = ["Notes in Trap"];

const endGamePositions = ["Parked", "Onstage", "Harmony", "None"];

export default function Home() {
  // Add a counter state variable that stores the count of each item in the CounterList
  const [counters, setCounters] = useState<Record<string, number>>(
    [...AutonCounters, ...TeleopCounters, ...endGameCounters].reduce(
      (acc: Record<string, number>, item) => {
        acc[item] = 0;
        return acc;
      },
      {} as Record<string, number>
    )
  );

  const [teamNumber, setTeamNumber] = useState<string>("0");
  const [matchNumber, setMatchNumber] = useState<string>("0");

  const [endGamePosition, setEndGamePosition] = useState<string>("");
  const [leaveBonus, setLeaveBonus] = useState<string>("");

  const [comments, setComments] = useState<string>("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // Add a function that updates the count of an item in the CounterList
  const updateCounter = (item: string, value: number) => {
    setCounters((prev) => ({ ...prev, [item]: value }));
  };

  const mapCountersToText = (counters: Record<string, number>): string => {
    return Object.entries(counters)
      .map(([key, value]) => `**${key}**: ${value}`)
      .join("\n");
  };

  const getCopyText = (): string => {
    let textToCopy = [
      `Qualification Match #**${matchNumber}**`,
      `Team **${teamNumber}**`,
    ].join("\n");

    textToCopy += "\n\n__Autonomous__\n";
    textToCopy += mapCountersToText(
      AutonCounters.reduce((acc: Record<string, number>, item) => {
        acc[item] = counters[item];
        return acc;
      }, {})
    );
    textToCopy += `\n**Leave Bonus**: ${leaveBonus}`;

    textToCopy += "\n\n__Teleop__\n";
    textToCopy += mapCountersToText(
      TeleopCounters.reduce((acc: Record<string, number>, item) => {
        acc[item] = counters[item];
        return acc;
      }, {})
    );

    textToCopy += "\n\n__End Game__\n";
    textToCopy += mapCountersToText(
      endGameCounters.reduce((acc: Record<string, number>, item) => {
        acc[item] = counters[item];
        return acc;
      }, {})
    );
    textToCopy += `\n**Parked/Onstage/Harmony**: ${endGamePosition}`;

    textToCopy += `\n\n__Comments__\n${comments}`;

    return textToCopy;
  };

  const handleEndGameSelectionChange = (e: any) => {
    setEndGamePosition(e.target.value);
  };

  const handleLeaveBonusSelectionChange = (e: any) => {
    setLeaveBonus(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col p-12 sm:p-24 bg-black text-white">
      <div className="flex flex-col sm:flex-row gap-x-8 w-full gap-y-8">
        <div className="w-full max-w-xl mr-24">
          <h2 className="text-xl font-bold">Details</h2>
          <Label text="Match Number" />
          <Input
            type="number"
            value={matchNumber}
            max={99}
            min={1}
            isInvalid={parseInt(matchNumber) < 1 || parseInt(matchNumber) > 99}
            onValueChange={setMatchNumber}
          />

          <Label text="Team Number" />
          <Input
            type="number"
            value={teamNumber}
            max={99}
            min={1}
            isInvalid={parseInt(teamNumber) < 1 || parseInt(teamNumber) > 99999}
            onValueChange={setTeamNumber}
          />

          <Label text="Comments" />
          <Textarea
            placeholder={`Add any comments here about the team's robot the match. (e.g., "shoots from distance into speaker", "easily maneuvers around defenders", "slow at aligning to speaker", "struggles to pick up notes", "quickly passes notes to alliance partner from center field", "bot disabled mid-match")`}
            value={comments}
            onValueChange={setComments}
          />
        </div>
        <div id="auton-counters" className="flex flex-col">
          <h2 className="text-xl font-bold">Autonomous</h2>
          {AutonCounters.map((item) => (
            <Counter
              key={item}
              label={item}
              count={counters[item]}
              setCount={(value) => {
                updateCounter(item, value);
              }}
            />
          ))}
          <Label text="Leave Bonus?" />
          <Select
            selectedKeys={[leaveBonus]}
            onChange={handleLeaveBonusSelectionChange}
          >
            {["Yes", "No"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <h2 className="text-xl font-bold">Teleop</h2>
          {TeleopCounters.map((item) => (
            <Counter
              key={item}
              label={item}
              count={counters[item]}
              setCount={(value) => {
                updateCounter(item, value);
              }}
            />
          ))}
        </div>
        <div className="flex flex-col min-w-28">
          <h2 className="text-xl font-bold">End Game</h2>
          {endGameCounters.map((item) => (
            <Counter
              key={item}
              label={item}
              count={counters[item]}
              setCount={(value) => {
                updateCounter(item, value);
              }}
            />
          ))}
          <Label text="End Game Position" />
          <Select
            placeholder="Select a position"
            selectedKeys={[endGamePosition]}
            onChange={handleEndGameSelectionChange}
          >
            {endGamePositions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div id="result-copy-paste" className="mt-8 cursor-pointer">
        <Label text="Click to copy/paste" icon={FiClipboard} />
        <Textarea
          isReadOnly
          variant="bordered"
          value={getCopyText()}
          onClick={async (e) => {
            await navigator.clipboard.writeText(getCopyText());
            handleSnackbarClick();
          }}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message="Text copied to clipboard!"
      />
    </main>
  );
}
