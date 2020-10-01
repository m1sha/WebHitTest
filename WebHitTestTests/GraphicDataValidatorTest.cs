using NUnit.Framework;
using System.Drawing;
using System.Linq;
using WebHitTest.Models;
using WebHitTest.Models.Validation;

namespace WebHitTestTests
{
    public class GraphicDataValidatorTest
    {
        private GraphicDataValidator validator = new GraphicDataValidator();

        [Test]
        public void BoundShouldBeWidthAndHeightEqualZero()
        {
            //arrange
            var data = new GraphicData();

            //act
            var result = validator.Validate(data);
            var err = result.Errors.FirstOrDefault(p => p.PropertyName == "Bounds");

            //assert
            Assert.NotNull(err);
        }

        [Test]
        public void BoundShouldBeWidthAndHeightMoreThanZero()
        {
            //arrange
            var data = new GraphicData 
            { 
                Bounds = new RectangleF(0, 0, 1, 1) 
            };

            //act
            var result = validator.Validate(data);
            var err = result.Errors.FirstOrDefault(p => p.PropertyName == "Bounds");

            //assert
            Assert.Null(err);
        }

        [Test]
        public void PolygonShouldBeNull()
        {
            //arrange
            var data = new GraphicData();

            //act
            var result = validator.Validate(data);
            var err = result.Errors.FirstOrDefault(p => p.PropertyName == "Polygon");

            //assert
            Assert.NotNull(err);
        }

        [Test]
        public void PolygonShouldBeNotNull()
        {
            //arrange
            var data = new GraphicData
            {
                Polygon = new[]
                {
                    new PointF(0, 1),
                    new PointF(1, 1),
                    new PointF(0, 0)
                }
            };

            //act
            var result = validator.Validate(data);
            var err = result.Errors.FirstOrDefault(p => p.PropertyName == "Polygon");

            //assert
            Assert.Null(err);
        }

        [Test]
        public void PolygonShouldBeNotLessThan3Point()
        {
            //arrange
            var data = new GraphicData
            {
                Bounds = new RectangleF(0, 0, 1, 1),
                Polygon = new[]
                {
                    new PointF(0, 1),
                    new PointF(1, 1),
                   // new PointF(0, 0)
                }
            };

            //act
            var result = validator.Validate(data);
            var err = result.Errors.FirstOrDefault(p => p.PropertyName == "Polygon");

            //assert
            Assert.NotNull(err);
        }

        [Test]
        public void PolygonShouldBeMoreOrEqualsThan3Point()
        {
            //arrange
            var data = new GraphicData
            {
                Bounds = new RectangleF(0, 0, 1, 1),
                Polygon = new[]
                {
                    new PointF(0, 1),
                    new PointF(1, 1),
                    new PointF(0, 0)
                }
            };

            //act
            var result = validator.Validate(data);
            var err = result.Errors.FirstOrDefault(p => p.PropertyName == "Polygon");

            //assert
            Assert.Null(err);
        }
    }
}
