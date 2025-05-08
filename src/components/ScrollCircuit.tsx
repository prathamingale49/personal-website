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
      const nodeDistance = 150; // Adjusted for better spacing
      
      // Create structured circuit paths
      const createCircuitPath = (startX: number, startY: number, width: number, height: number, numNodes: number) => {
        const nodes: CircuitNode[] = [];
        const stepX = width / (numNodes - 1);
        const stepY = height / (numNodes - 1);
        
        // Create nodes in a rectangular pattern
        for (let i = 0; i < numNodes; i++) {
          const x = startX + (i * stepX);
          const y = startY + (i * stepY);
          const type = componentCycle[i % componentCycle.length];
          nodes.push(createNode(x, y, type));
        }
        return nodes;
      };

      // Create main circuit paths
      const leftCircuit = createCircuitPath(
        window.innerWidth * 0.2,
        100,
        window.innerWidth * 0.2,
        totalHeight - 200,
        8
      );
      
      const centerCircuit = createCircuitPath(
        window.innerWidth * 0.4,
        100,
        window.innerWidth * 0.2,
        totalHeight - 200,
        8
      );
      
      const rightCircuit = createCircuitPath(
        window.innerWidth * 0.6,
        100,
        window.innerWidth * 0.2,
        totalHeight - 200,
        8
      );

      // Connect nodes in a more circuit-like pattern
      const connectCircuitPath = (path: CircuitNode[]) => {
        for (let i = 0; i < path.length - 1; i++) {
          connectNodes(path[i], path[i + 1]);
        }
      };

      // Connect horizontal paths between circuits
      const connectCircuitsHorizontally = (path1: CircuitNode[], path2: CircuitNode[]) => {
        for (let i = 0; i < path1.length; i += 2) {
          if (path1[i] && path2[i]) {
            connectNodes(path1[i], path2[i]);
          }
        }
      };

      // Connect the circuits
      connectCircuitPath(leftCircuit);
      connectCircuitPath(centerCircuit);
      connectCircuitPath(rightCircuit);
      connectCircuitsHorizontally(leftCircuit, centerCircuit);
      connectCircuitsHorizontally(centerCircuit, rightCircuit);

      // Add some feedback loops
      for (let i = 2; i < leftCircuit.length - 2; i += 2) {
        if (leftCircuit[i] && rightCircuit[i + 1]) {
          connectNodes(leftCircuit[i], rightCircuit[i + 1]);
        }
      }

      nodesRef.current = [...leftCircuit, ...centerCircuit, ...rightCircuit];
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

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      scrollPercentRef.current = scrollTop / scrollHeight;
      const down = scrollTop > lastScrollPositionRef.current;
      lastScrollPositionRef.current = scrollTop;
      isScrollingDownRef.current = down;
      
      // Activate connections based on scroll position
      activateConnectionsByScrollPosition(scrollPercentRef.current);
      
      // Trigger node pulses only when scrolling
      if (down || !down) {
        triggerNodePulses();
      }
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingDownRef.current = false;
        // Deactivate all connections when scrolling stops
        nodesRef.current.forEach(node => {
          node.connections.forEach(conn => {
            conn.active = false;
          });
        });
      }, 200);
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

      // Draw connections with improved visibility
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          // Always draw the connection line, but make it subtle
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(conn.node.x, conn.node.y);
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)'; // Duller base line
          ctx.lineWidth = 1;
          ctx.stroke();

          if (conn.active) {
            // Draw the active connection with a gradient
            const gradient = ctx.createLinearGradient(node.x, node.y, conn.node.x, conn.node.y);
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
            gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)');
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(conn.node.x, conn.node.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw moving dot with enhanced visibility
            const progress = conn.currentPosition;
            const x = node.x + (conn.node.x - node.x) * progress;
            const y = node.y + (conn.node.y - node.y) * progress;
            
            // Draw a larger, more visible electron dot
            const dotGradient = ctx.createRadialGradient(x, y, 0, x, y, 5);
            dotGradient.addColorStop(0, 'rgba(168, 85, 247, 1)');
            dotGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)');
            dotGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
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
