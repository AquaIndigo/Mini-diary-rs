
import {ChevronLeft, ChevronRight} from "react-feather";
import { Moment } from "moment-timezone";
import React, { ReactElement } from "react";

import { MAX_DATE, MIN_DATE } from "../../../constants";
import { createDate, toMonthYear } from "../../../utils/dateFormat";

import { iconProps } from "../../../utils/icons";

export interface StateProps {
    allowFutureEntries: boolean;
    dateSelected: Moment;
}

export interface DispatchProps {
    setMonthSelectedNext: () => void;
    setMonthSelectedPrevious: () => void;
}

type Props = StateProps & DispatchProps;

export default function CalendarNav(props: Props): ReactElement {
    const {
        allowFutureEntries,
        dateSelected,
        setMonthSelectedNext,
        setMonthSelectedPrevious,
    } = props;

    const today = createDate();

    // Check if buttons for switching to previous/next month should be enabled. Determined based on
    // the min/max dates and whether future diary entries are allowed
    const canClickPrev = dateSelected.isAfter(MIN_DATE, "month");
    const canClickNext =
        dateSelected.isBefore(MAX_DATE, "month") &&
        (allowFutureEntries || dateSelected.isBefore(today, "month"));

    return (
        <div className="calendar-nav">
            <button
                type="button"
                className="button button-invisible"
                disabled={!canClickPrev}
                onClick={setMonthSelectedPrevious}
            >
                <ChevronLeft {...iconProps} title={"previous-month"} />
            </button>
            <h1 className="month-name">{toMonthYear(dateSelected)}</h1>
            <button
                type="button"
                className="button button-invisible"
                disabled={!canClickNext}
                onClick={setMonthSelectedNext}
            >
                <ChevronRight {...iconProps} title={"next-month"} />
            </button>
        </div>
    );
}
