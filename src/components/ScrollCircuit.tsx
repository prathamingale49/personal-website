import React, { useEffect, useRef } from "react";

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  type: "resistor" | "capacitor" | "inductor" | "battery" | "transistor" | "opamp";
  connections: {
    node: CircuitNode;
    currentPosition: number;
    active: boolean;
    direction: number;
  }[];
  color: string;
  pulseRadius: number;
  maxPulseRadius: number;
  pulseActive: boolean;
  pulseSpeed: number;
}

export const ScrollCircuit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const animationRef = useRef<number>(0);
  const scrollPercentRef = useRef<number>(0);
  const lastScrollPositionRef = useRef<number>(0);
  const isScrollingDownRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createCircuitNodes();
    };

    const componentCycle: CircuitNode["type"][] = [
      "resistor",
      "capacitor",
      "inductor",
      "opamp", // Added more op-amps in the cycle
      "resistor",
      "battery",
      "opamp", // Added more op-amps in the cycle
      "resistor",
      "transistor",
      "opamp", // Added more op-amps in the cycle
    ];

    const createCircuitNodes = () => {
      nodesRef.current = [];
      const totalHeight = document.body.scrollHeight;
      const nodeDistance = 180; // Decreased for more nodes
      
      // Create a more complex network with nodes across the entire width
      const createNodesInArea = (minX: number, maxX: number, minY: number, maxY: number, density: number) => {
        const nodes: CircuitNode[] = [];
        const count = Math.floor(density * (maxX - minX) * (maxY - minY) / 10000);
        
        for (let i = 0; i < count; i++) {
          const x = minX + Math.random() * (maxX - minX);
          const y = minY + Math.random() * (maxY - minY);
          const type = componentCycle[Math.floor(Math.random() * componentCycle.length)];
          nodes.push(createNode(x, y, type));
        }
        return nodes;
      };
      
      // Create main vertical paths (left, center, and right)
      const leftPathNodes = createVerticalPath(window.innerWidth * 0.1, nodeDistance, componentCycle);
      const centerPathNodes = createVerticalPath(window.innerWidth * 0.5, nodeDistance, componentCycle);
      const rightPathNodes = createVerticalPath(window.innerWidth * 0.9, nodeDistance, componentCycle);
      
      // Create random nodes in between to create a messy network
      const randomNodes = createNodesInArea(
        window.innerWidth * 0.05, 
        window.innerWidth * 0.95, 
        100, 
        totalHeight - 100, 
        0.5 // Density factor
      );

      // Connect vertical paths
      connectVerticalPath(leftPathNodes);
      connectVerticalPath(centerPathNodes);
      connectVerticalPath(rightPathNodes);
      
      // Connect horizontal and diagonal paths between main paths
      connectPathsHorizontally(leftPathNodes, centerPathNodes);
      connectPathsHorizontally(centerPathNodes, rightPathNodes);
      connectPathsDiagonally(leftPathNodes, rightPathNodes);
      
      // Connect random nodes to create a messy network
      connectRandomNodes(randomNodes, [...leftPathNodes, ...centerPathNodes, ...rightPathNodes]);
      
      // Create some opamp integrations
      createOpampCircuits(leftPathNodes, centerPathNodes, rightPathNodes);

      nodesRef.current = [...leftPathNodes, ...centerPathNodes, ...rightPathNodes, ...randomNodes];
    };

    const createNode = (x: number, y: number, type: CircuitNode["type"]): CircuitNode => ({
      x,
      y,
      radius: 4,
      type,
      connections: [],
      color: "#a855f7", // Neon purple for better visibility
      pulseRadius: 0,
      maxPulseRadius: 18, // Increased for better visibility
      pulseActive: false,
      pulseSpeed: 0.6,
    });

    const connectNodes = (a: CircuitNode, b: CircuitNode) => {
      if (!a || !b) return; // Safeguard
      const link = {
        node: b,
        currentPosition: 0,
        active: false,
        direction: 1,
      } as const;
      a.connections.push({ ...link });
      b.connections.push({ ...link, node: a });
    };

    const createVerticalPath = (x: number, nodeDistance: number, componentTypes: CircuitNode["type"][]) => {
      const path: CircuitNode[] = [];
      const totalHeight = document.body.scrollHeight;
      for (let y = 100, i = 0; y < totalHeight - 100; y += nodeDistance, i++) {
        // Add some randomness to x position for less rectangular feel
        const randomX = x + (Math.random() - 0.5) * 40;
        path.push(createNode(randomX, y, componentTypes[i % componentTypes.length]));
      }
      return path;
    };

    const connectVerticalPath = (path: CircuitNode[]) => {
      for (let i = 0; i < path.length - 1; i++) {
        connectNodes(path[i], path[i + 1]);
      }
    };

    const connectPathsHorizontally = (path1: CircuitNode[], path2: CircuitNode[]) => {
      const connections = Math.min(path1.length, path2.length);
      for (let i = 0; i < connections; i += 2) {
        connectNodes(path1[i], path2[i]);
      }
    };

    const connectPathsDiagonally = (path1: CircuitNode[], path2: CircuitNode[]) => {
      const connections = Math.min(path1.length, path2.length) - 1;
      for (let i = 0; i < connections; i += 3) {
        connectNodes(path1[i], path2[i + 1]);
        connectNodes(path1[i + 1], path2[i]);
      }
    };

    const connectRandomNodes = (randomNodes: CircuitNode[], structuredNodes: CircuitNode[]) => {
      // Connect each random node to 2-4 other nodes
      randomNodes.forEach(node => {
        const connectionsCount = 2 + Math.floor(Math.random() * 3);
        const availableNodes = [...randomNodes, ...structuredNodes].filter(n => n !== node);
        
        // Find closest nodes to connect to
        const sortedByDistance = availableNodes.sort((a, b) => {
          const distA = Math.sqrt((a.x - node.x) ** 2 + (a.y - node.y) ** 2);
          const distB = Math.sqrt((b.x - node.x) ** 2 + (b.y - node.y) ** 2);
          return distA - distB;
        });
        
        // Connect to closest nodes
        for (let i = 0; i < Math.min(connectionsCount, sortedByDistance.length); i++) {
          if (Math.random() < 0.7) { // 70% chance to connect for organic feel
            connectNodes(node, sortedByDistance[i]);
          }
        }
      });
    };
    
    const createOpampCircuits = (leftPath: CircuitNode[], centerPath: CircuitNode[], rightPath: CircuitNode[]) => {
      // Create some special opamp circuit formations
      const paths = [leftPath, centerPath, rightPath];
      
      // Add opamp circuits at various places
      for (let i = 2; i < Math.min(leftPath.length, rightPath.length, centerPath.length); i += 3) {
        const sourcePath = paths[i % 3];
        const targetPath = paths[(i + 1) % 3];
        
        if (sourcePath[i] && targetPath[i - 1]) {
          // Create an opamp node
          const midX = (sourcePath[i].x + targetPath[i - 1].x) / 2;
          const midY = (sourcePath[i].y + targetPath[i - 1].y) / 2;
          const opamp = createNode(midX, midY, "opamp");
          opamp.radius = 6; // Slightly larger for visibility
          
          // Connect in a feedback configuration (common in circuit design)
          connectNodes(sourcePath[i], opamp);
          connectNodes(opamp, targetPath[i - 1]);
          
          if (targetPath[i]) {
            connectNodes(targetPath[i - 1], targetPath[i]); // Feedback path
          }
          
          nodesRef.current.push(opamp);
        }
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      scrollPercentRef.current = scrollTop / scrollHeight;
      const down = scrollTop > lastScrollPositionRef.current;
      lastScrollPositionRef.current = scrollTop;
      isScrollingDownRef.current = down;
      
      // Activate connections based on exact scroll position rather than just direction
      activateConnectionsByScrollPosition(scrollPercentRef.current);
      
      // If scrolling, show obvious animation by pulsing nodes
      triggerNodePulses();
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => (isScrollingDownRef.current = false), 200);
    };

    const activateConnectionsByScrollPosition = (percent: number) => {
      const unique = nodesRef.current.flatMap((n) => n.connections.map((c) => ({ s: n, c })));
      
      // Determine how many connections to activate based on scroll percentage
      const connectionsToActivate = Math.floor(unique.length * percent);
      
      // Update connection state based on exact scroll position
      unique.forEach((item, idx) => {
        // Use scroll position to determine if connection should be active
        const shouldBeActive = idx < connectionsToActivate;
        
        item.c.active = shouldBeActive;
        
        // Reverse direction when scrolling up
        if (shouldBeActive) {
          item.c.direction = isScrollingDownRef.current ? 1 : -1;
          item.c.currentPosition = isScrollingDownRef.current ? 0 : 1;
        }
      });
    };
    
    const triggerNodePulses = () => {
      // Find nodes that are currently visible in the viewport
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;
      
      nodesRef.current.forEach(node => {
        if (node.y >= viewportTop && node.y <= viewportBottom) {
          // Add some randomness to pulse activation
          if (Math.random() < 0.3) { // 30% chance to pulse
            node.pulseActive = true;
            node.pulseRadius = 0;
          }
        }
      });
    };

    // ───────────────── drawing helpers
    const drawSymbol = (ctx: CanvasRenderingContext2D, n: CircuitNode) => {
      ctx.save();
      ctx.translate(n.x, n.y);
      
      // Draw glow effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radius * 2);
      glowGradient.addColorStop(0, `rgba(168, 85, 247, ${0.3 + Math.sin(Date.now() * 0.001) * 0.1})`);
      glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, n.radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw symbol based on type
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#a855f7';

      switch (n.type) {
        case 'resistor':
          // Draw zigzag resistor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, 0);
          for (let i = 0; i < 3; i++) {
            ctx.lineTo(-n.radius + (i + 0.5) * n.radius, -n.radius);
            ctx.lineTo(-n.radius + (i + 1) * n.radius, 0);
          }
          ctx.stroke();
          break;

        case 'capacitor':
          // Draw capacitor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(-n.radius, n.radius);
          ctx.moveTo(n.radius, -n.radius);
          ctx.lineTo(n.radius, n.radius);
          ctx.stroke();
          break;

        case 'inductor':
          // Draw inductor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, 0);
          for (let i = 0; i < 3; i++) {
            ctx.arc(-n.radius + (i + 0.5) * n.radius, 0, n.radius / 2, 0, Math.PI * 2);
          }
          ctx.stroke();
          break;

        case 'battery':
          // Draw battery symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(-n.radius, n.radius);
          ctx.moveTo(n.radius, -n.radius);
          ctx.lineTo(n.radius, n.radius);
          ctx.moveTo(-n.radius / 2, -n.radius / 2);
          ctx.lineTo(n.radius / 2, -n.radius / 2);
          ctx.stroke();
          break;

        case 'transistor':
          // Draw transistor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(n.radius, 0);
          ctx.lineTo(-n.radius, n.radius);
          ctx.closePath();
          ctx.stroke();
          break;

        case 'opamp':
          // Draw op-amp symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(n.radius, 0);
          ctx.lineTo(-n.radius, n.radius);
          ctx.closePath();
          ctx.stroke();
          // Draw + and - inputs
          ctx.beginPath();
          ctx.arc(-n.radius / 2, -n.radius / 2, n.radius / 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-n.radius / 2, n.radius / 2);
          ctx.lineTo(-n.radius / 2 + n.radius / 2, n.radius / 2);
          ctx.stroke();
          break;
      }

      // Draw pulse if active
      if (n.pulseActive) {
        const pulseGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.pulseRadius);
        const opacity = 1 - (n.pulseRadius / n.maxPulseRadius);
        pulseGradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.8})`);
        pulseGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.beginPath();
        ctx.arc(0, 0, n.pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = pulseGradient;
        ctx.fill();

        n.pulseRadius += n.pulseSpeed;
        if (n.pulseRadius > n.maxPulseRadius) {
          n.pulseRadius = 0;
          n.pulseActive = false;
        }
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections with improved animation
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          if (conn.active) {
            const gradient = ctx.createLinearGradient(node.x, node.y, conn.node.x, conn.node.y);
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
            gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.6)');
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(conn.node.x, conn.node.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw moving dot along the connection
            const progress = conn.currentPosition;
            const x = node.x + (conn.node.x - node.x) * progress;
            const y = node.y + (conn.node.y - node.y) * progress;
            
            const dotGradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
            dotGradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
            dotGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = dotGradient;
            ctx.fill();

            // Update position
            conn.currentPosition += 0.02 * conn.direction;
            if (conn.currentPosition >= 1) {
              conn.currentPosition = 0;
            } else if (conn.currentPosition <= 0) {
              conn.currentPosition = 1;
            }
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        drawSymbol(ctx, node);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize animation
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
