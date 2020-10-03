import { DrawMode } from './DrawMode'

export class CommandDispetcher {
  commands: CommandCollection

  constructor() {
    this.commands = new CommandCollection()
      .add(new Command(DrawMode.SELECT_POINT_MODE, "isPointInPolygone", Events.MOUSE_UP, MouseButtons.LEFT))
      .add(new Command(DrawMode.POLYGON_MODE, "addPolygonPointOrFinish", Events.MOUSE_UP, MouseButtons.LEFT))
      .add(new Command(DrawMode.POLYGON_MODE, "cancelDrawPolygon", Events.MOUSE_UP, MouseButtons.RIGHT))
      .add(new Command(DrawMode.POLYGON_MODE, "startDrawPolygon", Events.MOUSE_DOWN, MouseButtons.LEFT))
      .add(new Command(DrawMode.POLYGON_MODE, "drawingPolygon", Events.MOUSE_MOVE, MouseButtons.NONE))
  }

  switchCommad(eventType: string, drawMode: number, e: MouseEvent) {
    const commands = this.findCommands(eventType, drawMode, e.which)
    for (var i = 0; i < commands.length; i++) {
      commands[i].action(e)
    }
  }

  findCommands(eventType: string, drawMode: number, mouseButton) {
    return this.commands.find(eventType, drawMode, mouseButton)
  }

  getCommandByName(name: string): Command {
    return this.commands.getByName(name)
  }

}

export class Command {
  name: string
  eventType: string
  mouseButton: number
  drawMode: number
  action: Function

  constructor(drawMode: number, name: string, eventType: string, mouseButton: number, action: Function = null) {
    this.name = name
    this.eventType = eventType
    this.mouseButton = mouseButton
    this.drawMode = drawMode
    this.action = action
  }
}

export class CommandCollection {
  commands: Command[]

  constructor() {
    this.commands = []
  }

  add(command: Command) {
    this.commands.push(command)
    return this
  }

  getByName(name: string): Command {
    return this.commands.filter(p => p.name === name)[0]
  }

  find(eventType: string, drawMode: number, mouseButton) {
    return this.commands.filter(p => p.eventType === eventType &&
      p.drawMode === drawMode &&
      p.mouseButton === mouseButton)
  }
}

export const MouseButtons = {
  NONE: 0,
  LEFT: 1,
  MIDDLE: 2,
  RIGHT: 3
}

export const Events = {
  MOUSE_UP: "onmouseup",
  MOUSE_DOWN: "onmousedown",
  MOUSE_MOVE: "onmousemove"
}