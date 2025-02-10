import { React, useState, Box, Tab, Tabs, AssignmentIndRoundedIcon } from '../../../Exports-Modules/Exports';

import { CustomTabPanel, a11yProps } from './Styles/Styles';
import PositionPermissions from './PositionPermissions';

const Admin = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#ffffff' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab icon={<AssignmentIndRoundedIcon fontSize='small' />} iconPosition='start' label='Cargos' {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <PositionPermissions />
                </CustomTabPanel>
            </Box>
        </>
    )
}

export default Admin;