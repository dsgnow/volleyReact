import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import chorzowskaImage from '../../Assets/Images/halachorzowska.jpg'
import delfin from '../../Assets/Images/delfin.jpeg'
import { NavLink, useRouteMatch } from 'react-router-dom'

const StyledCard = styled(Card)`
  width: 315px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
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
`

const StylednavLink = styled(NavLink)`
  text-decoration: none;
`

const gamesData = [
  {
    id: 1,
    name: 'Chorzowska',
    city: 'Gliwice',
    street: 'Chorzowska 24/11',
    date: '16.03.2021',
    time: '21:30',
    places: 24,
    freePlaces: 12,
    level: 'amatorski'
  },
  {
    id: 2,
    name: 'Delfin',
    city: 'Gliwice',
    street: 'Leśna 11/11',
    date: '24.03.2021',
    time: '21:30',
    places: 12,
    freePlaces: 10,
    level: 'amatorski'
  }
]

export default function MediaCard(props) {
  const { url } = useRouteMatch()
  const id = '1'

  return (
    <>
      {props.data.map((game) => {
        return (
          <StyledCard key={game.id}>
            <CardActionArea>
              <StyledCardMedia image={chorzowskaImage} title={game.name} />
              <CardContent style={{ marginLeft: 'auto' }}>
                <Typography variant="h4">{`${game.name}`}</Typography>
                <Typography
                  gutterBottom
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: 700 }}>
                  {`${game.city}`}
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
                  Ilość wolnych miejsc: {`${game.freePlaces}/${game.places}`}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: '5px' }}>
                  Cena: {`${game.price} zł/os.`}
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
