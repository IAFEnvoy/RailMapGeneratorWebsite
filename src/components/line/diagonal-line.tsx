import React from 'react';
import { LineAttributes, Line, LineComponentProps } from '../../constants/constants';

const DiagonalLine = (props: LineComponentProps) => {
    const { id, attrs, handleClick } = props;
    const { color, diagonal = defaultDiagonalLineAttributes } = attrs;
    // get type specific attrs with default value
    const {
        startFrom = defaultDiagonalLineAttributes.startFrom,
        offsetFrom = defaultDiagonalLineAttributes.offsetFrom,
        offsetTo = defaultDiagonalLineAttributes.offsetTo,
    } = diagonal;
    const x1_ = startFrom === 'from' ? props.x1 : props.x2;
    const x2_ = startFrom === 'from' ? props.x2 : props.x1;
    const y1_ = startFrom === 'from' ? props.y1 : props.y2;
    const y2_ = startFrom === 'from' ? props.y2 : props.y1;

    const horizontalOrVertical = Math.abs(x2_ - x1_) > Math.abs(y2_ - y1_) ? 'vertical' : 'horizontal';

    const [offset1, offset2] = startFrom === 'from' ? [offsetFrom, offsetTo] : [offsetTo, offsetFrom];
    const dx1 = horizontalOrVertical === 'vertical' ? 0 : offset1;
    const dy1 = horizontalOrVertical === 'vertical' ? offset1 : 0;
    const dx2 = Math.sqrt(offset2);
    const dy2 = ((x2_ - x1_ > 0 && y2_ - y1_ > 0) || (x2_ - x1_ < 0 && y2_ - y1_ < 0) ? -1 : 1) * Math.sqrt(offset2);

    const [x1, y1, x2, y2] = [x1_ + dx1, y1_ + dy1, x2_ + dx2, y2_ + dy2];

    const x = horizontalOrVertical === 'vertical' ? x2 + Math.abs(y2 - y1) * (x2 - x1 > 0 ? -1 : 1) : x1;
    const y = horizontalOrVertical === 'vertical' ? y1 : y2 + Math.abs(x2 - x1) * (y2 - y1 > 0 ? -1 : 1);

    const onClick = React.useCallback(
        (e: React.MouseEvent<SVGPathElement, MouseEvent>) => handleClick(id, e),
        [id, handleClick]
    );

    return React.useMemo(
        () => (
            <path
                d={`M ${x1},${y1} L ${x},${y} L ${x2},${y2}`}
                fill="none"
                stroke={color[2]}
                strokeWidth={5}
                strokeLinejoin="round"
                onClick={onClick}
            />
        ),
        [x1, y1, x, y, x2, y2, color[2], onClick]
    );
};

/**
 * <DiagonalLine /> specific props.
 */
export interface DiagonalLineAttributes extends LineAttributes {
    /**
     * Change the drawing direction of line.
     * e.g. from
     *         b
     *        /
     *      a-
     * e.g. to
     *        -b
     *       /
     *      a
     */
    startFrom: 'from' | 'to';
    offsetFrom: number;
    offsetTo: number;
}

const defaultDiagonalLineAttributes: DiagonalLineAttributes = { startFrom: 'from', offsetFrom: 0, offsetTo: 0 };

const diagonalLineFields = [
    {
        type: 'input',
        label: 'panel.details.line.diagonal.offsetFrom',
        value: (attrs?: DiagonalLineAttributes) => (attrs ?? defaultDiagonalLineAttributes).offsetFrom.toString(),
        onChange: (val: string | number, attrs_: DiagonalLineAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultDiagonalLineAttributes;
            // return if invalid
            if (!Number.isInteger(Number(val))) return attrs;
            // set value
            attrs.offsetFrom = Number(val);
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'input',
        label: 'panel.details.line.diagonal.offsetTo',
        value: (attrs?: DiagonalLineAttributes) => (attrs ?? defaultDiagonalLineAttributes).offsetTo.toString(),
        onChange: (val: string | number, attrs_: DiagonalLineAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultDiagonalLineAttributes;
            // return if invalid
            if (!Number.isInteger(Number(val))) return attrs;
            // set value
            attrs.offsetTo = Number(val);
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'select',
        label: 'panel.details.line.diagonal.startFrom',
        value: (attrs?: DiagonalLineAttributes) => (attrs ?? defaultDiagonalLineAttributes).startFrom,
        options: { from: 'from', to: 'to' },
        onChange: (val: string | number, attrs_: DiagonalLineAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultDiagonalLineAttributes;
            // set value
            attrs.startFrom = val as 'from' | 'to';
            // return modified attrs
            return attrs;
        },
    },
];

const diagonalLineIcon = (
    <svg viewBox="0 0 24 24" height={40} width={40} focusable={false}>
        <path d="M9,18V12L15,6" stroke="currentColor" fill="none" />
    </svg>
);

const diagonalLine: Line<DiagonalLineAttributes> = {
    component: DiagonalLine,
    icon: diagonalLineIcon,
    defaultAttrs: defaultDiagonalLineAttributes,
    // TODO: fix this
    // @ts-ignore-error
    fields: diagonalLineFields,
};

export default diagonalLine;
