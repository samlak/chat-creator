import styles from '@/components/Loading/loading.module.css';

const Loading = ({
  color = '#000',
  style = 'small',
}) => {
  return (
    <span className={style == 'small' ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default Loading;

Loading.defaultProps = {
  style: 'small',
};
