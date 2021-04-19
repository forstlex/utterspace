import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Geocode from 'react-geocode';

import api from '../../utils/api';
import PlacesAutocomplete from '../autoComplete/index';
import { setAlert } from '../../actions/alert';
import { addSpace } from '../../actions/listings';

Geocode.setApiKey("AIzaSyBz6_ghMkyk--dKtlMtR-7nY0nR-coTVAM");
Geocode.setLanguage("en");

const AddListing = ({ user, addSpace, setAlert }) => {

  const [formData, setFormData] = useState({
    rentType: 'driveway',
    description: '',
    location: '',
    price: 0,
    images: [],
    previewImages: []
  });

  let history = useHistory();
  const { rentType, description, location, price, images, previewImages } = formData;

  const onFileChange = e => {
    const imgURL = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, images: [...images, e.target.files[0]], previewImages: [...previewImages, imgURL] });
    e.target.value = null;
  }

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeLocation = (value) => {
    setFormData({ ...formData, location: value });
  }

  const onChangeRentType = e => {
    let type;
    if (e.target.value === 'garage') {
      type = 'garage'
    } else {
      type = 'driveway';
    }
    setFormData({ ...formData, rentType: type });
  }

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
      setAlert('Please select image.', 'danger')
    } else {
      let formData = new FormData();
      images.forEach(image => {
        formData.append('images', image);
      })
      let localPaths = [];
      api.post("/spaces/upload-images", formData, {
      }).then(res => {
        localPaths = res.data.files;
        Geocode.fromAddress(location).then(
          (response) => {
            const data = {
              rentType, description,
              location, price,
              userid: user._id,
              images: localPaths,
              geo: response.results[0].geometry.location
            };
            addSpace(data, history);
          },
          (error) => {
            console.error(error);
          }
        );
      }).catch(error => {   
        console.error('ERROR CODE:', error.name + ': ' + error.message);
        console.log('AAAAA:', error.response.data);
        // setAlert(error);    
        // setAlert(error.Error, 'danger');
      });
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
            <select value={rentType} onChange={onChangeRentType}>
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
            <PlacesAutocomplete changeLocation={onChangeLocation} />
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
              <div className="upload_frame">
                {previewImages.map((img, index) => <img key={index} onClick={(e) => removeImage(e, index)} className="preview" src={img} alt="" />)}
                <h3 className="remove_label">You can remove image to click</h3>
              </div>
            )}
            <input type="file" value={""} name="images" onChange={onFileChange} onClick={e => (e.target.value = null)} multiple />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Add" />
        </div>

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