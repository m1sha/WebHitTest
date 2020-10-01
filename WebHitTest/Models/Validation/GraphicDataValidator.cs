using FluentValidation;
using System.Linq;

namespace WebHitTest.Models.Validation
{
    public class GraphicDataValidator : AbstractValidator<GraphicData>
    {
        public GraphicDataValidator()
        {
            RuleFor(r => r.Bounds)
               .Must(p => p.Width > 0 && p.Height > 0)
               .WithMessage("The bound width and height must be more than zero");

            RuleFor(r => r.Polygon)
               .NotNull()
               .WithMessage("The polygon is null");

            RuleFor(r => r.Polygon)
              .Must(p => p != null && p.Length >= 3)
              .WithMessage("Needs minimum 3 points to create polygon");
              //.When(p => p.Polygon != null && p.Polygon.Any(o => o.X >= -p.Bounds.Width / 2 && o.X <= p.Bounds.Width / 2 &&
              //  o.Y >= -p.Bounds.Height / 2 && o.Y <= p.Bounds.Height / 2))
              //.WithMessage("The one or more points out of border of the viewport");
        }
    }
}
