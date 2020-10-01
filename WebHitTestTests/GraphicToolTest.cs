using NUnit.Framework;
using System.Drawing;
using WebHitTest.Models;

namespace WebHitTestTests
{
    public class GraphicToolTest
    {
        PointF[] polygon = new PointF[]
                {
                    new PointF { X = 1, Y = 1 },
                    new PointF { X = 20, Y = 1 },
                    new PointF { X = 20, Y = 20 },
                    new PointF { X = 1, Y = 20 }
                };

        [Test]
        public void PointShouldBeInPolygon()
        {
            //arrange
            var point = new PointF { X = 2, Y = 2 };

            //act
            var result = GraphicTool.IsPointInPolygon4(polygon, point);

            //assert
            Assert.IsTrue(result);
        }

        [Test]
        public void PointShouldBeNotInPolygon()
        {
            //arrange
            var point = new PointF { X = -1, Y = 1 };
            
            //act
            var result = GraphicTool.IsPointInPolygon4(polygon, point);

            //assert
            Assert.IsFalse(result);
        }

        [Test]
        public void PointShouldBeNotAtPolygonBorder()
        {
            //arrange
            var point = new PointF { X = 1, Y = 1 };

            //act
            var result = GraphicTool.IsPointInPolygon4(polygon, point);

            //assert
            Assert.IsFalse(result);
        }
    }
}