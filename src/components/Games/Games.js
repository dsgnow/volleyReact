import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  CardActionArea,
  Typography,
  Box
} from '@material-ui/core'
import { NavLink, useRouteMatch } from 'react-router-dom'

const StyledCard = styled(Card)`
  width: 315px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  margin: 30px 0;
  text-align: left;
  ${({ theme }) => `
    {  
       ${theme.breakpoints.up('sm')} {
        margin: 30px 30px;
        width: 345px;
      }
   `}
`

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  justify-content: center;
  align-items: center;
`

const StylednavLink = styled(NavLink)`
  text-decoration: none;
`

const CardMediaHeader = styled(Typography)`
  color: white;
`

export default function MediaCard(props) {
  const { url } = useRouteMatch()
  const id = '1'

  MediaCard.propTypes = {
    data: PropTypes.array.isRequired
  }

  return (
    <>
      {props.data.map((game) => {
        return (
          <StyledCard key={game.id}>
            <CardActionArea>
              <StyledCardMedia title={game.name}>
                <CardMediaHeader variant="h4">{`${game.city} ${game.name}`}</CardMediaHeader>
              </StyledCardMedia>
              <CardContent style={{ marginLeft: 'auto' }}>
                <Typography
                  gutterBottom
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: 700 }}>
                  {`${game.dateStart}`}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{ marginTop: '5px' }}>
                  Czas trwania:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${game.gameTime}min.`}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{ marginTop: '5px' }}>
                  Poziom: {game.level}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: '5px' }}>
                  Ilość wolnych miejsc:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${game.freePlaces}/${game.places}`}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: '5px' }}>
                  Cena:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${game.price} zł/os.`}
                  </Box>
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {`${game.street}, ${game.city}`}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="large" color="primary">
                Zapisz się
              </Button>
              <StylednavLink to={`${url}/składy/${id}`}>
                <Button size="large" color="primary">
                  Składy
                </Button>
              </StylednavLink>
            </CardActions>
          </StyledCard>
        )
      })}
    </>
  )
}
