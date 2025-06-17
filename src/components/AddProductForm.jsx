import React, { useState, useCallback } from 'react';
import '../styles/AddProductForm.css';

const FileUploadBox = ({ onFileSelect, color, onFileRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // Simulate upload progress for each file
    files.forEach((file) => {
      const fileId = `${file.name}-${Date.now()}`;
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: {
          progress: 0,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1), // Convert to MB
          status: 'uploading',
          file: file // Store the actual file object
        }
      }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: {
              ...prev[fileId],
              progress,
              status: progress === 100 ? 'completed' : 'uploading'
            }
          }));
        } else {
          clearInterval(interval);
        }
      }, 300);
    });

    onFileSelect(files);
  };

  const handleRemoveFile = (fileId) => {
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      const fileToRemove = newProgress[fileId].file;
      delete newProgress[fileId];
      onFileRemove(fileToRemove); // Call the removal callback
      return newProgress;
    });
  };

  return (
    <div className="upload-section">
      <div 
        className={`upload-box ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p>Drag files to upload</p>
        <button className="choose-file-btn" onClick={() => document.getElementById(`file-input-${color}`).click()}>
          Choose File
        </button>
        <input
          id={`file-input-${color}`}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

      {Object.entries(uploadProgress).length > 0 && (
        <div className="upload-progress-list">
          {Object.entries(uploadProgress).map(([fileId, file]) => (
            <div key={fileId} className="upload-progress-item">
              <div className="file-info">
                <div className="file-icon">
                  {file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? '🖼️' : '📄'}
                </div>
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <div className="file-meta">
                    <span>{file.size} mb</span>
                    <span>{file.status === 'completed' ? 'Completed' : `${file.progress}% done`}</span>
                  </div>
                </div>
                <button 
                  className="remove-file-btn"
                  onClick={() => handleRemoveFile(fileId)}
                >×</button>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddProductForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    brandName: '',
    productName: '',
    originalPrice: '',
    currentPrice: '',
    discountPercentage: '',
    description: '',
    colors: [],
    colorImages: {},
    sizes: [],
    features: []
  });

  const [newFeature, setNewFeature] = useState('');
  const [newSize, setNewSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [colorImages, setColorImages] = useState([]);

  const availableColors = [
    'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorSelect = (color) => {
    if (!formData.colors.includes(color)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, color],
        colorImages: {
          ...prev.colorImages,
          [color]: []
        }
      }));
    }
    setSelectedColor(color);
  };

  const handleImageUpload = useCallback((files, color) => {
    setFormData(prev => ({
      ...prev,
      colorImages: {
        ...prev.colorImages,
        [color]: [...(prev.colorImages[color] || []), ...files]
      }
    }));
  }, []);

  const handleRemoveImage = useCallback((fileToRemove, color) => {
    setFormData(prev => ({
      ...prev,
      colorImages: {
        ...prev.colorImages,
        [color]: prev.colorImages[color].filter(file => file !== fileToRemove)
      }
    }));
  }, []);

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }));
      setNewSize('');
    }
  };

  const handleAddFeature = () => {
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData(prev => {
      const newColors = prev.colors.filter(c => c !== color);
      const newColorImages = { ...prev.colorImages };
      delete newColorImages[color];
      return {
        ...prev,
        colors: newColors,
        colorImages: newColorImages
      };
    });
  };

  const handleRemoveSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const handleRemoveFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form Data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-product-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Current Price</label>
              <input
                type="number"
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Discount Percentage</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Colors</label>
            <div className="color-selection">
              <select
                value={selectedColor}
                onChange={(e) => handleColorSelect(e.target.value)}
              >
                <option value="">Select a color</option>
                {availableColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              <div className="selected-colors">
                {formData.colors.map(color => (
                  <div key={color} className="color-tag">
                    <span>{color}</span>
                    <button type="button" onClick={() => handleRemoveColor(color)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Replace the existing color images section with: */}
          {formData.colors.length > 0 && (
            <div className="color-images-section">
              <h3>Product Images by Color</h3>
              {formData.colors.map(color => (
                <div key={color} className="color-image-upload">
                  <div className="form-group">
                    <label>Upload Images for {color}</label>
                    <FileUploadBox
                      onFileSelect={(files) => handleImageUpload(files, color)}
                      onFileRemove={(file) => handleRemoveImage(file, color)}
                      color={color}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label>Sizes</label>
            <div className="size-input">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Add size (e.g., S, M, L)"
              />
              <button type="button" onClick={handleAddSize}>Add</button>
            </div>
            <div className="selected-sizes">
              {formData.sizes.map(size => (
                <div key={size} className="size-tag">
                  <span>{size}</span>
                  <button type="button" onClick={() => handleRemoveSize(size)}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Features</label>
            <div className="feature-input">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
              />
              <button type="button" onClick={handleAddFeature}>Add</button>
            </div>
            <div className="selected-features">
              {formData.features.map(feature => (
                <div key={feature} className="feature-tag">
                  <span>{feature}</span>
                  <button type="button" onClick={() => handleRemoveFeature(feature)}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Add Product</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default AddProductForm; 