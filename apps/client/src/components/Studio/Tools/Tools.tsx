import React from 'react'
import { AppBar, Box, Paper, Tab, Tabs } from '@mui/material'
import {
  useCountTextboxes,
  useMeme
} from '@viclafouch/meme-studio-utilities/hooks'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import GeneralTab from './GeneralTab'
import TextboxesTab from './TextboxesTab'
import ToolsActions from './ToolsActions'

type ToolsTab = 'general' | 'texts'

const Tools = () => {
  const [currentTab, setCurrentTab] = React.useState<ToolsTab>('general')
  const countTextboxes = useCountTextboxes()
  const meme = useMeme() as Meme

  const handleChangeTab = (event: React.SyntheticEvent, newValue: ToolsTab) => {
    setCurrentTab(newValue)
  }

  const onAddText = () => {
    setCurrentTab('texts')
  }

  return (
    <Paper
      elevation={5}
      component="aside"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <ToolsActions meme={meme} onAddText={onAddText} />
      <Box
        flex={1}
        display="flex"
        sx={{ overflow: 'hidden' }}
        flexDirection="column"
      >
        <AppBar position="static" sx={{ flexShrink: 0 }}>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Général" value="general" />
            <Tab label={`Textes (${countTextboxes})`} value="texts" />
          </Tabs>
        </AppBar>
        <Box sx={{ overflowY: 'scroll' }} flex={1} p={2}>
          <Box>
            {currentTab === 'general' ? (
              <GeneralTab meme={meme} />
            ) : (
              <TextboxesTab />
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default Tools
