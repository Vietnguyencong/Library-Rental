import React from "react";

const Item = props => {
  const { item } = props;

  const convertBolbToImage = (imgareBlob)=>{
    if(imgareBlob){
      console.log("image in ", imgareBlob);
      var arryIn =new Uint8Array(imgareBlob);
      var blob = new Blob([imgareBlob], {type: "image/jpeg"})
      let create =   window.URL || window.webkitURL
      var imagre = create.createObjectURL(blob)
      console.log("image out", imagre);
      // console.log("img: ", imgareBlob);
      return imagre;
    }   
  }
  const blobToImage = async (blob) => {
    let imagere = await Promise(resolve => {
      const url = URL.createObjectURL(blob)
      let img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(img)
      }
      img.src = url
    })
    return imagere
  }
  return (
    <div className="column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={item.item_type}
              />
              {/* <img
                src={convertBolbToImage(item.image)}
                alt={item.item_type}
              /> */}
              {/* <img
                source={{uri: item.image.data}}
                alt={item.item_type}
              /> */}
              {/* <img
                src={URL.createObjectURL(item.image)}
                alt={item.item_type}
              /> */}
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {item.title}{" "}
              <span className="tag is-primary">${item.price}</span>
            </b>
            <div>{item.shortDescr}</div>
            {item.stock > 0 ? (
              <small>{item.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart1({
                    id: item.id,
                    item,
                    amount: 1
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;