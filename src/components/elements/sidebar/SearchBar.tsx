import {XCircle, Clock} from "react-feather";
import {Moment} from "moment-timezone";
import React, {useEffect, useState} from "react";


import {createDate} from "../../../utils/dateFormat";
import {iconProps} from "../../../utils/icons";
import {SkipForward} from "react-feather";

export interface StateProps {
    dateSelected: Moment;
    // searchKey: string;
}

export interface DispatchProps {
    search: () => void;
    setSK: (sk: string) => void;
    setDateSelected: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;

export const SearchBar = (props: Props) => {
    const {search, setDateSelected, setSK} = props;
    const today = createDate();

    const [searchKey, setSearchKey] = useState("");
    const [isToday, setIsToday] = useState(props.dateSelected.isSame(today, "day"));

    useEffect(() => {
        setIsToday(props.dateSelected.isSame(today, "day"));
    }, [props.dateSelected])
    const returnToday = () => {
        setIsToday(true);
        setDateSelected(today);
    }
    return (
        <div className="view-selector">
            <div className="search-input-wrapper">
                <input
                    type="search"
                    className="search-input"
                    placeholder={"search…"}
                    spellCheck={false}
                    value={searchKey}
                    onChange={(e) => {
                        setSearchKey(e.target.value);
                        setSK(e.target.value);
                    }}
                />
                {searchKey !== "" && (
                    <span className="search-input-clear">
							<button
                                type="button"
                                className="button button-invisible"
                                onClick={() => {
                                    setSearchKey("");
                                    setSK("");
                                }}
                                title={"clear"}
                            >
								<XCircle {...iconProps} />
							</button>
                    </span>
                )}
            </div>
            <button
                type="button"
                className="button button-invisible button-today"
                onClick={search}
                disabled={searchKey !== ""}
                title={"That year, this today."}
            >
                <Clock {...iconProps} />
            </button>
            <button
                type="button"
                className="button button-invisible button-today"
                disabled={isToday}
                onClick={(e) => {
                    returnToday()
                }}
                title={"today"}
            >
                <SkipForward {...iconProps} />
            </button>
        </div>
    );
}