import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Convert } from 'mongo-image-converter';

import { setAlert } from '../../actions/alert';
import { addSpace } from '../../actions/listings';

const AddListing = ({ setAlert, user, addSpace }) => {
  const [formData, setFormData] = useState({
    rentType: 'driveway',
    description: '',
    location: '',
    price: 0,
    images: [],
    previewImages: []
  });

  const { rentType, description, location, price, images, previewImages } = formData;

  const onFileChange = e => {
    const imgURL = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, images: [...images, e.target.files[0]], previewImages: [...previewImages, imgURL] });
    e.target.value = null;
  }

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const removeImage = (index) => {
    images.splice(index, 1);
    previewImages.splice(index, 1);
    setFormData({ ...formData, images, previewImages })
  }

  const onSubmit = async e => {
    e.preventDefault();
    if (!description) {
      setAlert('Description is required', 'danger');
    } else if (!location) {
      setAlert('Location is required', 'danger');
    } else if (!price) {
      setAlert('Price is required', 'danger');
    } else if (images.length === 0) {
      setAlert('Please select image.')
    } else {
      const convertImage = async (img) => {
        return await Convert(img)
      }
      const convertImages = await Promise.all(
        images.map(img => convertImage(img))
      )

      const formData = { rentType, description, location, price, userid: user._id, images: convertImages };
      addSpace(formData)
    }
  };

  return (
    <Fragment>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <div className="item_body">
            <label required>
              Renting Type
              <span className="required">*</span>
            </label>
            <select value={rentType} onChange={onChange}>
              <option value="garage">Garage</option>
              <option value="driveway">Driveway</option>
            </select>
            <div className="item_footer">
              <p>You can select Renting Type in here</p>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="item_body">
            <label required>
              Description
              <span className="required">*</span>
            </label>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              required
              rows="3"
            />
            <div className="item_footer">
              <p>A great summary is rich and exciting! It should cover the major features of your space and neighbourhood in 1000 characters.</p>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="item_body">
            <label required>
              Location
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={onChange}
            />
            <div className="item_footer">
              <p>You can add space location here.</p>
            </div>
          </div>

        </div>
        <div className="form-group">
          <div className="item_body">
            <label required>
              Price per day
              <span className="required">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={onChange}
            />
            <div className="item_footer">
              <p>You can add price here.</p>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="item_body">
            {previewImages.length !== 0 && (
              <div>
                {previewImages.map((img, index) => <img key={index} onClick={(e) => removeImage(e, index)} className="preview" src={img} alt="" />)}
                <h3 style={{ textAlign: 'center', color: 'red' }}>You can remove image to click</h3>
              </div>
            )}
            <input type="file" value={""} name="imgCollection" onChange={onFileChange} onClick={e => (e.target.value = null)} multiple />
          </div>
        </div>
        <input type="submit" className="btn btn-primary" value="Add" />
      </form>

    </Fragment>
  );
}

AddListing.propTypes = {
  user: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  addSpace: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, addSpace })(AddListing);