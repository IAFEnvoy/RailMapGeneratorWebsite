import { MultiDirectedGraph } from 'graphology';
import { EdgeAttributes, GraphAttributes, NodeAttributes, NodeType } from '../constants/constants';
import { MiscNodeType } from '../constants/nodes';
import { StationType } from '../constants/stations';

export const getMousePosition = (e: React.MouseEvent) => {
    const bbox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    // console.log(e.clientX, bbox.left, e.clientY, bbox.top, x, y);
    return { x, y };
};

export const roundToNearestN = (x: number, n: number) => Math.round(x / n) * n;

/**
 * Calculate the canvas size from DOMRect of each node.
 * @param graph The graph.
 * @param svgViewBoxMin The viewport relative to each DOMRect.
 * @returns The canvas size.
 */
export const calculateCanvasSize = (graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>) => {
    let [xMin, yMin, xMax, yMax] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];

    graph.forEachNode((node, _) => {
        const nodeElm = document.getElementById(node) as SVGSVGElement | null;
        if (nodeElm) {
            const rect = transformedBoundingBox(nodeElm);
            xMin = Math.min(rect.x, xMin);
            yMin = Math.min(rect.y, yMin);
            xMax = Math.max(rect.x + rect.width, xMax);
            yMax = Math.max(rect.y + rect.height, yMax);
        }
    });

    xMin -= 50;
    yMin -= 50;
    xMax += 100;
    yMax += 100;

    return { xMin, yMin, xMax, yMax };
};

/**
 * Calculate the bounding box of the current element, with respect to its own transformation attribute.
 *
 * The SVGRect returned by `SVGGraphicsElement.getBBox()` will be irrespective of any
 * transformation attribute applied to it or the parent elements.
 * https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox#return_value
 *
 * This helper function uses the polyfill of `SVGGraphicsElement.getTransformToElement()`.
 * It gets the transformation matrix that transforms from the user coordinate system on the
 * current element to the user coordinate system on the specified target element.
 *
 * With the _transformed_ matrix, we then apply it back to the current element and thus
 * get the SVGRect that respect the transformation attribute applied to it.
 *
 * Reference:
 * https://stackoverflow.com/questions/10623809/get-bounding-box-of-element-accounting-for-its-transform
 *
 * It is clear we can ask every contributor to wrap their nodes with another <g id={id}>...</g>,
 * so that when getBBox is called, the SVGRect will be what we want as all transformations
 * are applied and calculated in the inner <g transform={...}>...</g>.
 * However, it will be complicated to make everyone and the docs right, so let this fixes everything.
 *
 * @param el The element to getBBox.
 * @returns The SVGRect with respect to its own transformation attribute.
 */
const transformedBoundingBox = (el: SVGSVGElement) => {
    const bb = el.getBBox();
    const svg = el.ownerSVGElement!;
    const m = (el.parentNode! as SVGSVGElement).getScreenCTM()!.inverse().multiply(el.getScreenCTM()!);

    // Create an array of all four points for the original bounding box
    const pts = [svg.createSVGPoint(), svg.createSVGPoint(), svg.createSVGPoint(), svg.createSVGPoint()];
    pts[0].x = bb.x;
    pts[0].y = bb.y;
    pts[1].x = bb.x + bb.width;
    pts[1].y = bb.y;
    pts[2].x = bb.x + bb.width;
    pts[2].y = bb.y + bb.height;
    pts[3].x = bb.x;
    pts[3].y = bb.y + bb.height;

    // Transform each into the space of the parent, and calculate the min/max points from that.
    let [xMin, yMin, xMax, yMax] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
    pts.forEach(pt => {
        pt = pt.matrixTransform(m);
        xMin = Math.min(xMin, pt.x);
        xMax = Math.max(xMax, pt.x);
        yMin = Math.min(yMin, pt.y);
        yMax = Math.max(yMax, pt.y);
    });

    // Update the bounding box with the new values.
    bb.x = xMin;
    bb.width = xMax - xMin;
    bb.y = yMin;
    bb.height = yMax - yMin;
    return bb;
};

export const isMacClient = navigator.platform.startsWith('Mac');

export const findNodesExist = (graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>) => {
    const nodesExist: { [key in NodeType]: boolean } = Object.fromEntries(
        [...Object.values(StationType), Object.values(MiscNodeType)].map(type => [type, false])
    );
    graph.forEachNode(node => {
        const type = graph.getNodeAttribute(node, 'type');
        nodesExist[type] = true;
    });
    return nodesExist;
};

export const shuffle = <T>(arr: T[]): T[] => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
