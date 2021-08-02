/* styles.js */
import css from "styled-jsx/css";

export function grid({
    cols = 2,
    rows = 2,
    gap = "0",
    height = "auto",
    width = "auto",
}) {
    return css.resolve`
        div {
            display: grid;
            grid-template-columns: repeat(${cols}, ${width});
            grid-template-rows: repeat(${rows}, ${height});
            grid-gap: ${gap};
            justify-content: center;
            align-items: center;
        }
    `;
}
export function invertByTheme(isDark) {
    return css.resolve`
        div {
            filter: invert(${isDark ? 1 : 0}) blur(0) !important;
        }
    `;
}
export const gridItem = () =>
    css.resolve`
        .item {
            object-fit: contain;
            max-width: 100%;
            max-height: 100%;
        }
    `;

export function centered({
    isColumns = false,
    centerText = false,
    selector = "div",
    gap = 0,
} = {}) {
    return css.resolve`
        ${selector} {
            display: flex;
            width: inherit;
            flex-direction: ${isColumns ? "column" : "row"};
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            text-align: ${centerText ? "center" : "start"};
            gap: ${gap}px;
        }
    `;
}
