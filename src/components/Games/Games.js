import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import chorzowskaImage from '../../assets/images/halachorzowska.jpg'
import delfin from '../../assets/images/delfin.jpeg'

const StyledCard = styled(Card)`
  width: 345px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  margin: 30px 0;
`

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
`

export default function MediaCard() {
  return (
    <>
      <StyledCard>
        <CardActionArea>
          <StyledCardMedia image={chorzowskaImage} title="Hala Chorzowska" />
          <CardContent style={{ marginLeft: 'auto' }}>
            <Typography gutterBottom variant="h5">
              Gliwice Chorzowska
            </Typography>
            <Typography
              gutterBottom
              color="textPrimary"
              variant="h5"
              style={{ fontWeight: 700 }}>
              16.03.2021 21:30
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              gutterBottom
              style={{ marginTop: '10px', marginBottom: '20px' }}>
              Ilość wolnych miejsc: 6/36
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Hala Widowiskowo - Sportowa ul. Chorzowska 5
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary">
            Zapisz się
          </Button>
        </CardActions>
      </StyledCard>
      <StyledCard>
        <CardActionArea>
          <StyledCardMedia image={delfin} title="Hala Delfin" />
          <CardContent style={{ marginLeft: 'auto' }}>
            <Typography gutterBottom variant="h5">
              Gliwice Delfin
            </Typography>
            <Typography
              gutterBottom
              color="textPrimary"
              variant="h5"
              style={{ fontWeight: 700 }}>
              24.03.2021 18:30
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              gutterBottom
              style={{ marginTop: '10px', marginBottom: '20px' }}>
              Ilość wolnych miejsc: 12/24
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ul. Warszawska 35, 44-100 Gliwice
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary">
            Zapisz się
          </Button>
        </CardActions>
      </StyledCard>
    </>
  )
}
