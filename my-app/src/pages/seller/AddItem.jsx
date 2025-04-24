import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, Upload, Check, Loader2 } from 'lucide-react';
import './AddItem.css';
import { db, storage } from "../../utils/firebase"; // Import db and storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
 // Import useAuth

const AddItem = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth(); // Get user from auth context
  const [item, setItem] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Check if user has seller role
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'seller') {
      navigate('/unauthorized');
    }
  }, [user, userRole, navigate]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!user) {
        throw new Error("You must be logged in to add items");
      }

      let imageUrl = null;

      if (image) {
        try {
          // Create a unique file name to avoid conflicts
          const fileName = `${user.uid}_${Date.now()}_${image.name}`;
          const storageRef = ref(storage, `products/${fileName}`);
          
          const uploadTask = uploadBytesResumable(storageRef, image);

          imageUrl = await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
              },
              (error) => {
                console.error("Error uploading image:", error);
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve(downloadURL);
                } catch (err) {
                  console.error("Error getting download URL:", err);
                  reject(err);
                }
              }
            );
          });
        } catch (imageError) {
          console.error("Image upload error:", imageError);
          throw new Error("Failed to upload image. Please try again.");
        }
      }

      // Parse price and quantity as numbers
      const parsedItem = {
        ...item,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
        imageUrl,
        sellerId: user.uid,
        sellerEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      // Add to Firestore
      const productsCollectionRef = collection(db, "products");
      await addDoc(productsCollectionRef, parsedItem);

      setSubmitSuccess(true);
      setTimeout(() => {
        if (window.confirm('Item added successfully! Add another item?')) {
          setItem({ name: '', description: '', category: '', price: '', quantity: '' });
          setImage(null);
          setImagePreview(null);
          setSubmitSuccess(false);
        } else {
          navigate('/seller/my-products');
        }
      }, 1500);
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.message || 'Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToDashboard = () => {
    navigate('/seller/dashboard');
  };

  // Updated categories to match with those in Products.jsx
  const categories = [
    'pottery', 'textile', 'woodwork', 'basketry', 
    'metalwork', 'eco-crafts', 'leatherwork', 'other'
  ];

  if (!user) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <button
            onClick={navigateToDashboard}
            className="back-button"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">Add New Item</h1>
        </div>
      </div>

      <div className="main-container">
        <div className="form-card">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-grid">
              <div className="form-field col-span-full">
                <label className="form-label">Item Name</label>
                <input
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="text-input"
                />
              </div>

              <div className="form-field col-span-full">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={item.description}
                  onChange={handleChange}
                  placeholder="Describe your product"
                  required
                  rows={4}
                  className="textarea-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={item.category}
                  onChange={handleChange}
                  className="select-input"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  value={item.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                  className="text-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  min="1"
                  className="text-input"
                />
              </div>

              <div className="form-field col-span-full">
                <label className="form-label">Product Image</label>
                <div className="image-upload-container" onClick={() => document.getElementById('file-upload').click()}>
                  <div className="image-upload-inner">
                    {imagePreview ? (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                      </div>
                    ) : (
                      <div>
                        <div className="image-placeholder">
                          <Image size={64} />
                        </div>
                        <p className="upload-hint">Click to upload an image</p>
                      </div>
                    )}
                    <input id="file-upload" name="file-upload" type="file" className="hidden-input" onChange={handleImageChange} accept="image/*" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${submitSuccess ? 'button-green' : 'button-blue'} ${isSubmitting ? 'button-disabled' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="button-icon spinner" />
                    Processing...
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check size={18} className="button-icon" />
                    Item Added!
                  </>
                ) : (
                  <>
                    <Upload size={18} className="button-icon" />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;