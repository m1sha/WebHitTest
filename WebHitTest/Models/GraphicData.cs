using System.Drawing;

namespace WebHitTest.Models
{
    public class GraphicData
    {
        /// <summary>
        /// Полигон
        /// </summary>
        public PointF[] Polygon { get; set; }

        /// <summary>
        /// Облать viewport
        /// </summary>
        public RectangleF Bounds { get; set; }
        
        /// <summary>
        /// Точка вхождения в полигон
        /// </summary>
        public PointF Point { get; set; }
    }
}
