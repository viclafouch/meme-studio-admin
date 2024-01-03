import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import LaunchIcon from '@mui/icons-material/Launch'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography
} from '@mui/material'
import { Link } from '@tanstack/react-router'
import { LightMeme } from '@viclafouch/meme-studio-utilities/schemas'
import { getMemeUrl } from '../../utils/meme'

type LoadingProps = {
  loading: true
  meme?: never
}

type MemeProps = {
  loading?: never
  meme: LightMeme
}

export type MemesListItemProps = LoadingProps | MemeProps

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
      {meme ? (
        // @ts-expect-error
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
      ) : (
        <Box>
          <Skeleton height={140} variant="rectangular" width="100%" />
          <CardContent>
            <Skeleton animation="wave" height={35} width="30%" sx={{ mb: 1 }} />
            <Skeleton
              animation="wave"
              height={15}
              width="25%"
              sx={{ mb: 0.5 }}
            />
            <Skeleton animation="wave" height={15} width="25%" />
          </CardContent>
        </Box>
      )}
      {meme ? (
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
      ) : (
        <CardActions>
          <Skeleton variant="rounded" height={25} width={70} />
          <Skeleton variant="rounded" height={25} width={70} />
        </CardActions>
      )}
    </Card>
  )
}

export default MemesListItem
