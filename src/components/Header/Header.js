import { useContext } from 'react';
import styles from './Header.module.scss';
import ReducerContext from '../../context/ReducerContext';

const Header = (props) => {
  const context = useContext(ReducerContext);
  const changePlayer = () => {
    context.dispatch({ type: 'changePlayer' });
  };
  return (
    <>
      <header>
        <div className={styles.wrapHeadings}>
          <h1>Siatkówka {context.state.gamePlace}</h1>
          <h2>{context.state.gameDate}</h2>
        </div>
        {/* <button onClick={changePlayer}>Test</button> */}
      </header>
    </>
  );
};

export default Header;
