import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
//import { times } from "lodash";
import React from "react";
import { testStore, Wrapper } from "../../test/TestWrapper";
import TimeRangeSelector from "./TimeRangeSelector";

describe("test time range selector", () => {
    it("snapshot test", () => {
        const { container } = render(
            Wrapper({ children: <TimeRangeSelector /> })
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it("click to dispatch redux action", async () => {
        render(<TimeRangeSelector />, {
            wrapper: Wrapper,
        });
        userEvent.type(screen.getByRole("slider"), "{arrowright}");
        expect(testStore.dispatch).toHaveBeenCalledTimes(2);
        expect(testStore.dispatch).toBeCalledWith({
            payload: [0, -1],
            type: "ui/updateTimeIndexRange",
        });
    });
});