import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import LaunchIcon from '@mui/icons-material/Launch'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { Link } from '@tanstack/react-router'
import { LightMeme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeUrl } from '../../utils/meme'

export type MemesListItemProps = {
  meme: LightMeme
}

const MemesListItem = ({ meme }: MemesListItemProps) => {
  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: '345px' },
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* @ts-expect-error */}
      <CardActionArea component={Link} to={`/memes/${meme.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={meme.imageUrl}
          alt={meme.name}
          loading="lazy"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {meme.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meme.width} x {meme.height} (px)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meme.textboxes.length} texte
            {meme.textboxes.length > 1 ? 's' : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          LinkComponent="a"
          href={getMemeUrl(meme)}
          target="_blank"
          startIcon={<LaunchIcon />}
          color="primary"
        >
          Créer
        </Button>
        {/* @ts-expect-error */}
        <Button
          size="small"
          startIcon={<EditIcon />}
          color="primary"
          LinkComponent={Link}
          to={`/memes/${meme.id}`}
        >
          Modifier
        </Button>
      </CardActions>
    </Card>
  )
}

export default MemesListItem
