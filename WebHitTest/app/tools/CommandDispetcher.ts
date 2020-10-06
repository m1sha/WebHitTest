import { DrawMode } from './DrawMode'

export class CommandDispetcher {
  commands: CommandCollection

  constructor() {
    this.commands = new CommandCollection()
      .add(new Command(DrawMode.SELECT_POINT_MODE, "isPointInPolygon", Events.MOUSE_UP, new MouseEventFilter(MouseButtons.LEFT)))
      .add(new Command(DrawMode.SELECT_POINT_MODE, "deletePolygon", Events.KEY_UP, new KeyboardEventFilter(KeyCodes.Del)))
      .add(new Command(DrawMode.POLYGON_MODE, "addPolygonPointOrFinish", Events.MOUSE_UP, new MouseEventFilter(MouseButtons.LEFT)))
      .add(new Command(DrawMode.POLYGON_MODE, "cancelDrawPolygon", Events.MOUSE_UP, new MouseEventFilter(MouseButtons.RIGHT)))
      .add(new Command(DrawMode.POLYGON_MODE, "startDrawPolygon", Events.MOUSE_DOWN, new MouseEventFilter(MouseButtons.LEFT)))
      .add(new Command(DrawMode.POLYGON_MODE, "drawingPolygon", Events.MOUSE_MOVE, new MouseEventFilter(MouseButtons.NONE)))
  }

  switchCommad(eventType: string, drawMode: number, e: MouseEvent | KeyboardEvent) {
    const eventFilter = EventFilter.create(e)
    const commands = this.findCommands(eventType, drawMode, eventFilter)
    for (var i = 0; i < commands.length; i++) {
      commands[i].action(e)
    }
  }

  findCommands(eventType: string, drawMode: number, e: EventFilter) {
    return this.commands.find(eventType, drawMode, e)
  }

  getCommandByName(name: string): Command {
    return this.commands.getByName(name)
  }

}

export class Command {
  name: string
  eventType: string
  eventFilter: EventFilter
  drawMode: number
  action: Function

  constructor(drawMode: number, name: string, eventType: string, eventFilter: EventFilter, action: Function = null) {
    this.name = name
    this.eventType = eventType
    this.eventFilter = eventFilter
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

  find(eventType: string, drawMode: number, e: EventFilter) {
    return this.commands.filter(p => p.eventType === eventType &&
      p.drawMode === drawMode &&
      p.eventFilter.which === e.which)
  }
}

export const MouseButtons = {
  NONE: 0,
  LEFT: 1,
  MIDDLE: 2,
  RIGHT: 3
}

export const KeyCodes = {
  Del: 46
}

export const Events = {
  MOUSE_UP: "onmouseup",
  MOUSE_DOWN: "onmousedown",
  MOUSE_MOVE: "onmousemove",
  KEY_UP: "onkeyup"
}

export class EventFilter {

  which: number

  constructor() {
    this.which = null
  }

  static create(e: MouseEvent | KeyboardEvent): EventFilter {
    const result = new EventFilter()
    result.which = e.which
    return result
  }
}

export class MouseEventFilter extends EventFilter {
  constructor(mouseButton: number) {
    super()
    this.which = mouseButton
  }
}

export class KeyboardEventFilter extends EventFilter {
  constructor(key: number) {
    super()
    this.which = key
  }
}