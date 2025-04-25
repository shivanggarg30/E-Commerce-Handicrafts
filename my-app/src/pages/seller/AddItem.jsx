import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, Upload, Check, Loader2 } from 'lucide-react';
import './AddItem.css';
// import initializeFirebase from "../../utils/FirebaseInit"; // 🔥 Firebase Init (commented out)
// import { collection, addDoc } from "firebase/firestore";  // 🔥 Firestore (commented out)
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // 🔥 Storage (commented out)
import { useAuth } from "../../context/AuthContext";

const AddItem = () => {
  // const { db, storage } = initializeFirebase(); // 🚫 Firebase services (commented)

  const navigate = useNavigate();
  const { user, userRole } = useAuth();

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
      if (!user) throw new Error("You must be logged in to add items");

      let imageUrl = null;

      if (image) {
        // 🔥 Firebase image upload logic (commented out)
        /*
        const fileName = `${user.uid}_${Date.now()}_${image.name}`;
        const storageRef = ref(storage, `products/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
        */
      }

      const parsedItem = {
        ...item,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
        imageUrl, // Would be the Firebase download URL
        sellerId: user.uid,
        sellerEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      // 🔥 Firestore add (commented out)
      // const productsCollectionRef = collection(db, "products");
      // await addDoc(productsCollectionRef, parsedItem);

      // Simulate success
      console.log("Simulated item data:", parsedItem);
      setSubmitSuccess(true);
      setTimeout(() => {
        if (window.confirm('Item "added"! Add another item?')) {
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

  const categories = [
    'pottery', 'textile', 'woodwork', 'basketry',
    'metalwork', 'eco-crafts', 'leatherwork', 'other'
  ];

  if (!user) return <div className="loading-container">Loading...</div>;

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <button onClick={navigateToDashboard} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title">Add New Item</h1>
        </div>
      </div>

      <div className="main-container">
        <div className="form-card">
          {error && <div className="error-message">{error}</div>}

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
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
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
                <div
                  className="image-upload-container"
                  onClick={() => document.getElementById('file-upload').click()}
                >
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
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="hidden-input"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
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
