import React from 'react';
import { CityCode } from '@railmapgen/rmg-palette-resources';
import { CanvasType, CategoriesType } from '../../../constants/constants';
import {
    defaultStationAttributes,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from '../../../constants/stations';
import { StationNumber } from './gzmtr-basic';
import { InterchangeField, StationAttributesWithInterchange } from '../../panels/details/interchange-field';
import { MultilineText, NAME_DY } from '../common/multiline-text';

const CODE_POS = [
    [[0, 0]],
    [[0, 0]],
    [
        [-18, 0],
        [18, 0],
    ],
    [
        [-15.588, -9],
        [15.588, -9],
        [0, 18],
    ],
];

const GzmtrIntStation = (props: StationComponentProps) => {
    const { id, x, y, attrs, handlePointerDown, handlePointerMove, handlePointerUp } = props;
    const {
        names = defaultStationAttributes.names,
        nameOffsetX = defaultGzmtrIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultGzmtrIntStationAttributes.nameOffsetY,
        transfer = defaultGzmtrIntStationAttributes.transfer,
    } = attrs[StationType.GzmtrInt] ?? defaultGzmtrIntStationAttributes;

    const onPointerDown = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerDown(id, e),
        [id, handlePointerDown]
    );
    const onPointerMove = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerMove(id, e),
        [id, handlePointerMove]
    );
    const onPointerUp = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerUp(id, e),
        [id, handlePointerUp]
    );

    const textX = nameOffsetX === 'left' ? -20 : nameOffsetX === 'right' ? 20 : 0;
    const textDy =
        (names[NAME_DY[nameOffsetY].namesPos].split('\\').length - 1) *
        NAME_DY[nameOffsetY].lineHeight *
        NAME_DY[nameOffsetY].polarity;
    const textY = textDy + (nameOffsetY === 'up' ? -24 : nameOffsetY === 'bottom' ? 24 : 0);
    const textAnchor = nameOffsetX === 'left' ? 'end' : nameOffsetX === 'right' ? 'start' : 'middle';

    const transferAll = transfer.flat().slice(0, 3); // slice to make sure at most 3 transfers
    const arrowColor = [
        ['black', 'black'],
        [transferAll.at(0)?.at(2) ?? 'black', transferAll.at(0)?.at(2) ?? 'black'],
        [transferAll.at(0)?.at(2) ?? 'black', transferAll.at(1)?.at(2) ?? 'black'],
        [transferAll.at(0)?.at(2) ?? 'black', transferAll.at(1)?.at(2) ?? 'black', transferAll.at(2)?.at(2) ?? 'black'],
    ];

    return React.useMemo(
        () => (
            <g id={id} transform={`translate(${x}, ${y})`}>
                <circle r={transferAll.length === 3 ? 22.395 : 18} fill="white" />
                {transferAll
                    .map(info => info[2])
                    .filter((color, i, arr) => arr.indexOf(color) === i)
                    .map(color => (
                        <marker
                            key={`gzmtr_int_arrow_${color}`}
                            id={`gzmtr_int_arrow_${color}`}
                            markerWidth="5"
                            markerHeight="5"
                            refX="1"
                            refY="1.25"
                            orient="auto"
                        >
                            <polygon points="0,0 0,3 2,1.5" fill={color} />
                        </marker>
                    ))}
                {transferAll.length <= 2 && (
                    <g>
                        {/* A simple white mask to hide all underlying lines. */}
                        <path d="M -18,-12 A 24 24 0 0 1 18,-12 L 18,12 A 24 24 0 0 1 -18,12 Z" fill="white" />
                        <path
                            d="M -18,-12 A 24 24 0 0 1 18,-12"
                            fill="none"
                            stroke={arrowColor[transferAll.length][0]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 18,12 A 24 24 0 0 1 -18,12"
                            fill="none"
                            stroke={arrowColor[transferAll.length][1]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                    </g>
                )}
                {transferAll.length >= 3 && (
                    <g>
                        <path
                            d="M -19.3948,11.1976 A 22.395 22.395 0 0 1 0,-22.395"
                            fill="none"
                            stroke={arrowColor[transferAll.length][0]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 0,-22.395 A 22.395 22.395 0 0 1 19.3948,11.1976"
                            fill="none"
                            stroke={arrowColor[transferAll.length][1]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                        <path
                            d="M 19.3948,11.1976 A 22.395 22.395 0 0 1 -19.3948,11.1976"
                            fill="none"
                            stroke={arrowColor[transferAll.length][2]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][2]})`}
                        />
                        {/* Add another 2 transparent arrows with marker to cover bottom arrows */}
                        <path
                            d="M -19.3948,11.1976 A 22.395 22.395 0 0 1 0,-22.395"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 0,-22.395 A 22.395 22.395 0 0 1 19.3948,11.1976"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                    </g>
                )}

                {transfer[0]?.map((info, i, arr) => (
                    <g
                        key={`gzmtr_int_${id}_stn_${i}`}
                        transform={`translate(${CODE_POS[arr.length][i][0]},${CODE_POS[arr.length][i][1]})`}
                    >
                        <StationNumber strokeColor={info[2]} lineCode={info[4]} stationCode={info[5]} />
                    </g>
                ))}

                {/* Below is an overlay element that has all event hooks but can not be seen. */}
                <path
                    id={`stn_core_${id}`}
                    r={transferAll.length === 3 ? 22.395 : 18}
                    fill="white"
                    fillOpacity="0"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    style={{ cursor: 'move' }}
                />
                <g transform={`translate(${textX}, ${textY})`} textAnchor={textAnchor} className="rmp-name-station">
                    <MultilineText
                        text={names[0].split('\\')}
                        fontSize={16}
                        lineHeight={16}
                        grow="up"
                        className="rmp-name__zh"
                    />
                    <MultilineText
                        text={names[1].split('\\')}
                        fontSize={10}
                        lineHeight={10}
                        grow="down"
                        className="rmp-name__en"
                    />
                </g>
            </g>
        ),
        [
            id,
            x,
            y,
            JSON.stringify(names),
            nameOffsetX,
            nameOffsetY,
            JSON.stringify(transferAll),
            onPointerDown,
            onPointerMove,
            onPointerUp,
        ]
    );
};

/**
 * <GzmtrStation /> specific props.
 */
export interface GzmtrIntStationAttributes extends StationAttributes, StationAttributesWithInterchange {
    nameOffsetX: 'left' | 'middle' | 'right';
    nameOffsetY: 'up' | 'middle' | 'bottom';
}

const defaultGzmtrIntStationAttributes: GzmtrIntStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: 'right',
    nameOffsetY: 'up',
    transfer: [[], []],
};

const gzmtrIntStationFields = [
    {
        type: 'textarea',
        label: 'panel.details.station.gzmtrInt.nameZh',
        value: (attrs?: GzmtrIntStationAttributes) =>
            (attrs ?? defaultGzmtrIntStationAttributes).names[0].replaceAll('\\', '\n'),
        onChange: (val: string | number, attrs_: GzmtrIntStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrIntStationAttributes;
            // set value
            attrs.names[0] = val.toString().replaceAll('\n', '\\');
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'textarea',
        label: 'panel.details.station.gzmtrInt.nameEn',
        value: (attrs?: GzmtrIntStationAttributes) =>
            (attrs ?? defaultGzmtrIntStationAttributes).names[1].replaceAll('\\', '\n'),
        onChange: (val: string | number, attrs_: GzmtrIntStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrIntStationAttributes;
            // set value
            attrs.names[1] = val.toString().replaceAll('\n', '\\');
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'select',
        label: 'panel.details.station.gzmtrInt.nameOffsetX',
        value: (attrs?: GzmtrIntStationAttributes) => (attrs ?? defaultGzmtrIntStationAttributes).nameOffsetX,
        options: { left: 'left', right: 'right' },
        onChange: (val: string | number, attrs_: GzmtrIntStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrIntStationAttributes;
            // set value
            attrs.nameOffsetX = val as 'left' | 'middle' | 'right';
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'select',
        label: 'panel.details.station.gzmtrInt.nameOffsetY',
        value: (attrs?: GzmtrIntStationAttributes) => (attrs ?? defaultGzmtrIntStationAttributes).nameOffsetY,
        options: { up: 'up', bottom: 'bottom' },
        onChange: (val: string | number, attrs_: GzmtrIntStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrIntStationAttributes;
            // set value
            attrs.nameOffsetY = val as 'up' | 'middle' | 'bottom';
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'custom',
        component: (
            <InterchangeField stationType={StationType.GzmtrInt} defaultAttrs={defaultGzmtrIntStationAttributes} />
        ),
    },
];

const gzmtrIntStationIcon = (
    <svg viewBox="0 0 24 24" height={40} width={40} focusable={false}>
        <g transform="translate(6,12)scale(0.4)">
            <StationNumber strokeColor="#000" lineCode="1" stationCode="09" />
        </g>
        <g transform="translate(18,12)scale(0.4)">
            <StationNumber strokeColor="#000" lineCode="2" stationCode="13" />
        </g>
        <marker id="arrow" markerWidth="5" markerHeight="5" refX="1" refY="1.25" orient="auto">
            <polygon points="0,0 0,3 2,1.5" />
        </marker>
        <path d="M 6,6 A 8 8 0 0 1 18,6" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M 18,18 A 8 8 0 0 1 6,18" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
    </svg>
);

const gzmtrIntStation: Station<GzmtrIntStationAttributes> = {
    component: GzmtrIntStation,
    icon: gzmtrIntStationIcon,
    defaultAttrs: defaultGzmtrIntStationAttributes,
    // TODO: fix this
    // @ts-ignore-error
    fields: gzmtrIntStationFields,
    metadata: {
        displayName: 'panel.details.station.gzmtrInt.displayName',
        cities: [CityCode.Guangzhou],
        canvas: [CanvasType.RailMap],
        categories: [CategoriesType.Metro],
        tags: [],
    },
};

export default gzmtrIntStation;
