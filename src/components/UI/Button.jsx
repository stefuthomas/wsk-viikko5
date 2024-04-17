import PropTypes from 'prop-types';

const Button = (props) => {
  const {text, handleClick} = props;
  return (
    <button
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
