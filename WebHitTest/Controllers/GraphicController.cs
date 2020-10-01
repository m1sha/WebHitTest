using Microsoft.AspNetCore.Mvc;
using System;
using WebHitTest.Models;

namespace WebHitTest.Controllers
{
    [ApiController]
    public class GraphicController : ControllerBase
    {
        [Route("api/[controller]/IsPointInPolygone")]
        [HttpPost]
        public IActionResult IsPointInPolygone([FromBody] GraphicData data)
        {
            if (data == null)
                new ArgumentNullException(nameof(data));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = GraphicTool.IsPointInPolygon4(data.Polygon, data.Point);
            return Ok(result);
        }
    }
}
