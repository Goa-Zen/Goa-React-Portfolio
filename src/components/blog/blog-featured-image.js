

const BlogFeaturedImage = props => {
  if (!props.img) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img  alt="image" src={props.img} />
    </div>
  );
};

export default BlogFeaturedImage;