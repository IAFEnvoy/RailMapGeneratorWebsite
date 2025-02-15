import { CityCode, MonoColour } from '@railmapgen/rmg-palette-resources';
import { MultiDirectedGraph } from 'graphology';
import { linePaths } from '../components/svgs/lines/lines';
import miscNodes from '../components/svgs/nodes/misc-nodes';
import stations from '../components/svgs/stations/stations';
import { EdgeAttributes, GraphAttributes, NodeAttributes, Theme } from '../constants/constants';
import { LinePathType, LineStyleType } from '../constants/lines';
import { MiscNodeType } from '../constants/nodes';
import { StationType } from '../constants/stations';
import { toRmg } from './to-rmg';

const color: Theme = [CityCode.Shanghai, 'sh1', '#E4002B', MonoColour.white];

describe('Unit tests for to rmg function', () => {
    it('will return one line for only two stations', async () => {
        const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes> = new MultiDirectedGraph();
        graph.addNode('stn_1', {
            visible: true,
            zIndex: 0,
            x: 0,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_2', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addDirectedEdgeWithKey('line_1', 'stn_1', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });

        const toRmgRes = toRmg(graph);

        expect(toRmgRes).toEqual([
            {
                theme: color,
                param: [
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_2',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_2'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_1'],
                                    children: [],
                                    branch: {},
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_2'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_1'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: false,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_1',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_1'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_2'],
                                    children: [],
                                    branch: {},
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_1'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_2'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: false,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                ],
                type: 'LINE',
            },
        ]);
    });

    it('will return loop line on loop', async () => {
        const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes> = new MultiDirectedGraph();
        graph.addNode('stn_1', {
            visible: true,
            zIndex: 0,
            x: 0,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_2', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_3', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addDirectedEdgeWithKey('line_1', 'stn_1', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_2', 'stn_1', 'stn_3', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_3', 'stn_3', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });

        const toRmgRes = toRmg(graph);
        expect(toRmgRes).toEqual([
            {
                theme: color,
                param: [
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_1',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_1'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_2'],
                                    children: [],
                                    branch: {},
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_3'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_3: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_1'],
                                    children: ['stn_2'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_3'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: true,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                ],
                type: 'LOOP',
            },
        ]);
    });

    it('will return branch line on branch line', async () => {
        const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes> = new MultiDirectedGraph();
        graph.addNode('stn_1', {
            visible: true,
            zIndex: 0,
            x: -1,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_2', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_3', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 2,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_a', {
            visible: true,
            zIndex: 0,
            x: -1,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addDirectedEdgeWithKey('line_1', 'stn_a', 'stn_1', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_2', 'stn_a', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_3', 'stn_a', 'stn_3', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });

        const toRmgRes = toRmg(graph);

        expect(toRmgRes).toEqual([
            {
                theme: color,
                param: [
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_3',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_3'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_1', 'stn_2'],
                                    children: [],
                                    branch: { left: ['through', 'stn_1'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_a'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_a'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_a: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_3'],
                                    children: ['stn_1', 'stn_2'],
                                    branch: { right: ['through', 'stn_1'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_3: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_a'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: false,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_2',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_2'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_1', 'stn_3'],
                                    children: [],
                                    branch: { left: ['through', 'stn_1'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_3: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_a'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_a'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_a: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_2'],
                                    children: ['stn_1', 'stn_3'],
                                    branch: { right: ['through', 'stn_1'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_a'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: false,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_1',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_1'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_2', 'stn_3'],
                                    children: [],
                                    branch: { left: ['through', 'stn_2'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_3: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_a'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_a'],
                                    children: ['lineend'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_a: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_1'],
                                    children: ['stn_2', 'stn_3'],
                                    branch: { right: ['through', 'stn_2'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_a'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: false,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                ],
                type: 'BRANCH',
            },
        ]);
    });

    it('will return lamp line on lamp line', async () => {
        const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes> = new MultiDirectedGraph();
        graph.addNode('stn_1', {
            visible: true,
            zIndex: 0,
            x: 0,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_2', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_3', {
            visible: true,
            zIndex: 0,
            x: 3,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_4', {
            visible: true,
            zIndex: 0,
            x: 2,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addDirectedEdgeWithKey('line_1', 'stn_1', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_2', 'stn_2', 'stn_3', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_3', 'stn_3', 'stn_4', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_4', 'stn_4', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });

        const toRmgRes = toRmg(graph);

        expect(toRmgRes).toEqual([
            {
                theme: color,
                param: [
                    [
                        {
                            svgWidth: { destination: 1500, runin: 1500, railmap: 1500, indoor: 1500 },
                            svg_height: 400,
                            style: 'shmetro',
                            y_pc: 50,
                            padding: 10,
                            branchSpacingPct: 33,
                            direction: 'r',
                            platform_num: '1',
                            theme: ['shanghai', 'sh1', '#E4002B', '#fff'],
                            line_name: ['地鐵線', 'Metro Line'],
                            current_stn_idx: 'stn_1',
                            stn_list: {
                                linestart: {
                                    name: ['LEFT END', 'LEFT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: [],
                                    children: ['stn_1'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                lineend: {
                                    name: ['RIGHT END', 'RIGHT END'],
                                    num: '00',
                                    services: ['local'],
                                    parents: ['stn_4'],
                                    children: [],
                                    branch: {},
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_3: {
                                    name: ['车站', 'Stn'],
                                    num: '3',
                                    services: ['local'],
                                    parents: ['stn_2'],
                                    children: ['stn_4'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_4: {
                                    name: ['车站', 'Stn'],
                                    num: '4',
                                    services: ['local'],
                                    parents: ['stn_3', 'stn_2'],
                                    children: ['lineend'],
                                    branch: { left: ['through', 'stn_3'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_2: {
                                    name: ['车站', 'Stn'],
                                    num: '2',
                                    services: ['local'],
                                    parents: ['stn_1'],
                                    children: ['stn_3', 'stn_4'],
                                    branch: { right: ['through', 'stn_3'] },
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                                stn_1: {
                                    name: ['车站', 'Stn'],
                                    num: '1',
                                    services: ['local'],
                                    parents: ['linestart'],
                                    children: ['stn_2'],
                                    transfer: { groups: [{}], tick_direc: 'r', paid_area: true },
                                    loop_pivot: false,
                                    one_line: true,
                                    int_padding: 355,
                                },
                            },
                            namePosMTR: { isStagger: true, isFlip: true },
                            customiseMTRDest: { isLegacy: false, terminal: false },
                            line_num: '1',
                            psd_num: '1',
                            info_panel_type: 'sh',
                            direction_gz_x: 40,
                            direction_gz_y: 70,
                            coline: {},
                            loop: false,
                            loop_info: { bank: true, left_and_right_factor: 0, bottom_factor: 1 },
                        },
                        '车站',
                        'Stn',
                    ],
                ],
                type: 'BRANCH',
            },
        ]);
    });

    it('will not throw error if only one edge connect a station and a virtual node', async () => {
        const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes> = new MultiDirectedGraph();
        graph.addNode('stn_1', {
            visible: true,
            zIndex: 0,
            x: 0,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('misc_node_2', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 1,
            type: MiscNodeType.Virtual,
            [MiscNodeType.Virtual]: miscNodes[MiscNodeType.Virtual].defaultAttrs,
        });
        graph.addDirectedEdgeWithKey('line_1', 'stn_1', 'misc_node_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });

        const toRmgRes = toRmg(graph);

        expect(toRmgRes).toEqual([]);
    });

    it('will not throw error if only one station connects more than 3 stations', async () => {
        const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes> = new MultiDirectedGraph();
        graph.addNode('stn_1', {
            visible: true,
            zIndex: 0,
            x: -1,
            y: 0,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_2', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_3', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 2,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_4', {
            visible: true,
            zIndex: 0,
            x: 1,
            y: 3,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addNode('stn_a', {
            visible: true,
            zIndex: 0,
            x: -1,
            y: 1,
            type: StationType.ShmetroBasic,
            [StationType.ShmetroBasic]: stations[StationType.ShmetroBasic].defaultAttrs,
        });
        graph.addDirectedEdgeWithKey('line_1', 'stn_a', 'stn_1', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_2', 'stn_a', 'stn_2', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_3', 'stn_a', 'stn_3', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });
        graph.addDirectedEdgeWithKey('line_4', 'stn_a', 'stn_4', {
            visible: true,
            zIndex: 0,
            type: LinePathType.Simple,
            [LinePathType.Simple]: linePaths[LinePathType.Simple].defaultAttrs,
            style: LineStyleType.SingleColor,
            [LineStyleType.SingleColor]: { color },
            reconcileId: '',
        });

        const toRmgRes = toRmg(graph);

        expect(toRmgRes).toEqual([]);
    });
});
