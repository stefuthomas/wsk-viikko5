import PropTypes from 'prop-types';

const SingleView = (props) => {
  const {selectedItem, setSelectedItem} = props;
  const handleClick = () => {
    setSelectedItem(null);
  };
  return (
    <>
      <dialog open={!!selectedItem}>
        <p>
          <button onClick={handleClick}>Close</button>
        </p>
        {selectedItem && (
          <>
            {
              selectedItem.media_type.includes('video') ?
                <video controls>
                  <source src={selectedItem.filename} type={selectedItem.media_type}/>
                </video> :
                <img src={selectedItem.filename} alt={selectedItem.title}/>
            }
            <h2>{selectedItem.title}</h2>
            <p>{new Date(selectedItem.created_at).toLocaleString('fi-FI')}</p>
            <p>{selectedItem.filesize}</p>
            <p>{selectedItem.media_type}</p>
          </>
        )}
      </dialog>
    </>
  );
}

SingleView.propTypes = {
  selectedItem: PropTypes.object,
  setSelectedItem: PropTypes.func,
};

export default SingleView;
