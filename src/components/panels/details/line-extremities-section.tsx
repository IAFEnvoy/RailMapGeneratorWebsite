import React from 'react';
import useEvent from 'react-use-event-hook';
import { useTranslation } from 'react-i18next';
import { Box, Button, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { useRootDispatch, useRootSelector } from '../../../redux';
import { ExternalStationAttributes } from '../../../constants/stations';
import { addSelected, clearSelected } from '../../../redux/runtime/runtime-slice';

export default function LineExtremitiesSection() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();
    const { selected } = useRootSelector(state => state.runtime);
    const selectedFirst = selected.at(0);
    const graph = React.useRef(window.graph);

    const [source, setSource] = React.useState('undefined');
    const [target, setTarget] = React.useState('undefined');
    const [sourceName, setSourceName] = React.useState('undefined');
    const [targetName, setTargetName] = React.useState('undefined');
    React.useEffect(() => {
        if (selectedFirst?.startsWith('line')) {
            const [s, t] = graph.current.extremities(selectedFirst);
            setSource(s);
            setTarget(t);

            // Extract name[0] from nodes if this node is a station.
            if (s.startsWith('stn')) {
                const type = graph.current.getNodeAttribute(s, 'type');
                setSourceName(
                    (
                        graph.current.getNodeAttribute(
                            s,
                            type
                        ) as ExternalStationAttributes[keyof ExternalStationAttributes]
                    )?.names.at(0) ?? 'undefined'
                );
            }
            if (t.startsWith('stn')) {
                const type = graph.current.getNodeAttribute(t, 'type');
                setTargetName(
                    (
                        graph.current.getNodeAttribute(
                            t,
                            type
                        ) as ExternalStationAttributes[keyof ExternalStationAttributes]
                    )?.names.at(0) ?? 'undefined'
                );
            }
        }
    }, [selected]);

    const handleSource = useEvent(() => {
        dispatch(clearSelected());
        dispatch(addSelected(source));
    });
    const handleTarget = useEvent(() => {
        dispatch(clearSelected());
        dispatch(addSelected(target));
    });

    const fields: RmgFieldsField[] = [
        {
            type: 'custom',
            label: t('panel.details.lineExtremities.source'),
            component: (
                <Button flex={1} size="sm" variant="link" onClick={handleSource}>
                    {source}
                </Button>
            ),
        },
        {
            type: 'custom',
            label: t('panel.details.lineExtremities.target'),
            component: (
                <Button flex={1} size="sm" variant="link" onClick={handleTarget}>
                    {target}
                </Button>
            ),
        },
        {
            type: 'input',
            label: t('panel.details.lineExtremities.sourceName'),
            value: sourceName,
        },
        {
            type: 'input',
            label: t('panel.details.lineExtremities.targetName'),
            value: targetName,
        },
    ];

    return (
        <Box p={1}>
            <Heading as="h5" size="sm">
                {t('panel.details.lineExtremities.title')}
            </Heading>

            <RmgFields fields={fields} minW={130} />
        </Box>
    );
}
