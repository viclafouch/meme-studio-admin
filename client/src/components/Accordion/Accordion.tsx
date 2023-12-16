import React from 'react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Stack } from '@mui/material'
import MuiAccordion, {
  AccordionProps as MuiAccordionProps
} from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const AccordionStyled = styled((props: MuiAccordionProps) => {
  return <MuiAccordion disableGutters elevation={0} square {...props} />
})(({ theme }) => {
  return {
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  }
})

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  return (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  )
})(({ theme }) => {
  return {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1)
    }
  }
})

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => {
  return {
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
  }
})

export type AccordionProps = {
  children: React.ReactNode
  isOpened: boolean
  title: string
  onChange: (newExpanded: boolean) => void
  actions: React.ReactNode
}

const Accordion = ({
  onChange,
  isOpened,
  children,
  title,
  actions
}: AccordionProps) => {
  const handleChange = (event: React.SyntheticEvent, newExpanded: boolean) => {
    onChange(newExpanded)
  }

  return (
    <AccordionStyled expanded={isOpened} onChange={handleChange}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography>{title}</Typography>
          {actions}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordionStyled>
  )
}

export default Accordion
