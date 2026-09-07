# Graph Report - .  (2026-09-06)

## Corpus Check
- Corpus is ~21,178 words - fits in a single context window. You may not need a graph.

## Summary
- 601 nodes · 752 edges · 90 communities (38 shown, 52 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.61)
- Token cost: 0 input · 51,172 output

## Community Hubs (Navigation)
- Input & Overlay UI
- Lint & Build Tooling
- TypeScript & Vite Config
- React Carousel
- Auria Brand & Design Concepts
- shadcn Components Config
- Error Capture System
- Auria Home Sections
- TanStack Router Tree
- Accordion / Checkbox / Popover
- Command Palette
- Menubar UI
- Button & Calendar
- Runtime Dependencies
- Site Shell & Navigation
- Package Manifest
- Form Primitives
- Interior Route Pages
- Context Menu
- Dropdown Menu
- Alert Dialog
- Table Primitives
- Breadcrumb
- Drawer
- Hover / Resizable / Skeleton
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `compilerOptions` - 22 edges
3. `AURIA Nexus` - 17 edges
4. `react` - 8 edges
5. `FileRoutesByPath` - 8 edges
6. `scripts` - 7 edges
7. `aliases` - 6 edges
8. `buttonVariants` - 6 edges
9. `tailwind` - 5 edges
10. `InteriorPage()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Search Engine Crawlers Allowlist` --conceptually_related_to--> `AURIA Nexus`  [INFERRED]
  public/robots.txt → README.md
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useChart()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AURIA Nexus Tech Stack** — readme_react, readme_vite, readme_tailwind_css, readme_framer_motion, readme_three_js, readme_lucide_icons [EXTRACTED 1.00]
- **Homepage Section Composition** — readme_hero_section, readme_services_section, readme_how_it_works, readme_global_network, readme_industries, readme_contact_form [EXTRACTED 1.00]
- **TanStack File-Based Routing** — src_routes_readme_tanstack_start, src_routes_readme_routing_conventions, src_routes_readme_root_layout, src_routes_readme_route_tree_gen [EXTRACTED 1.00]

## Communities (90 total, 52 thin omitted)

### Community 0 - "Input & Overlay UI"
Cohesion: 0.05
Nodes (38): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+30 more)

### Community 1 - "Lint & Build Tooling"
Cohesion: 0.06
Nodes (33): eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, nitro (+25 more)

### Community 2 - "TypeScript & Vite Config"
Cohesion: 0.06
Nodes (31): DOM, DOM.Iterable, ES2022, eslint.config.js, src/**/*.ts, src/**/*.tsx, vite/client, vite.config.ts (+23 more)

### Community 3 - "React Carousel"
Cohesion: 0.07
Nodes (25): react, react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem (+17 more)

### Community 4 - "Auria Brand & Design Concepts"
Cohesion: 0.11
Nodes (23): Search Engine Crawlers Allowlist, Animation System, AURIA Nexus, AURIA Brand Positioning, Contact Form, Luxury B2B Design Direction, Framer Motion, Global Network 3D Globe (+15 more)

### Community 5 - "shadcn Components Config"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 6 - "Error Capture System"
Cohesion: 0.17
Nodes (13): consumeLastCapturedError(), describeError(), describeStatus(), originalConsoleError, safeStringify(), renderErrorPage(), fetch(), getServerEntry() (+5 more)

### Community 7 - "Auria Home Sections"
Cohesion: 0.12
Nodes (7): AuriaHome(), mapNodes, modules, opsPhotos, timeline, toneColor, Route

### Community 8 - "TanStack Router Tree"
Cohesion: 0.14
Nodes (16): getRouter(), AboutRoute, ContactRoute, FileRoutesByFullPath, FileRoutesByTo, FileRouteTypes, HowWeWorkRoute, IndexRoute (+8 more)

### Community 9 - "Accordion / Checkbox / Popover"
Cohesion: 0.12
Nodes (9): AccordionContent, AccordionItem, AccordionTrigger, Checkbox, PopoverContent, Progress, Slider, Switch (+1 more)

### Community 10 - "Command Palette"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 11 - "Menubar UI"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 12 - "Button & Calendar"
Cohesion: 0.18
Nodes (13): Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent, PaginationEllipsis() (+5 more)

### Community 13 - "Runtime Dependencies"
Cohesion: 0.13
Nodes (15): embla-carousel-react, dependencies, embla-carousel-react, @radix-ui/react-scroll-area, @radix-ui/react-toggle-group, react-hook-form, recharts, tailwind-merge (+7 more)

### Community 14 - "Site Shell & Navigation"
Cohesion: 0.15
Nodes (7): ContactSection(), links, NavLink, SiteHeader(), SiteLayout(), useHideOnScroll(), Route

### Community 15 - "Package Manifest"
Cohesion: 0.14
Nodes (13): name, overrides, rolldown, private, scripts, build, build:dev, dev (+5 more)

### Community 16 - "Form Primitives"
Cohesion: 0.15
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 17 - "Interior Route Pages"
Cohesion: 0.31
Nodes (6): InteriorPage(), Route, Route, Route, Route, FileRoutesByPath

### Community 18 - "Context Menu"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 19 - "Dropdown Menu"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 20 - "Alert Dialog"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 21 - "Table Primitives"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 22 - "Breadcrumb"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 23 - "Drawer"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 24 - "Hover / Resizable / Skeleton"
Cohesion: 0.36
Nodes (5): HoverCardContent, ResizableHandle(), ResizablePanelGroup(), Skeleton(), cn()

### Community 25 - "Community 25"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 27 - "Community 27"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 28 - "Community 28"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 30 - "Community 30"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 32 - "Community 32"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 33 - "Community 33"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 34 - "Community 34"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **337 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+332 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **52 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `React Carousel`, `Package Manifest`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 72`, `Community 73`, `Community 74`, `Community 75`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 80`, `Community 81`, `Community 82`, `Community 83`, `Community 84`, `Community 85`?**
  _High betweenness centrality (0.301) - this node is a cross-community bridge._
- **Why does `cn()` connect `Hover / Resizable / Skeleton` to `Input & Overlay UI`, `React Carousel`, `Accordion / Checkbox / Popover`, `Command Palette`, `Menubar UI`, `Button & Calendar`, `Form Primitives`, `Context Menu`, `Dropdown Menu`, `Alert Dialog`, `Table Primitives`, `Breadcrumb`, `Drawer`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`?**
  _High betweenness centrality (0.273) - this node is a cross-community bridge._
- **Why does `react` connect `React Carousel` to `Input & Overlay UI`, `Button & Calendar`, `Runtime Dependencies`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _337 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Input & Overlay UI` be split into smaller, more focused modules?**
  _Cohesion score 0.05391120507399577 - nodes in this community are weakly interconnected._
- **Should `Lint & Build Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `TypeScript & Vite Config` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._