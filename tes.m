x1 = linspace(-5,5);
y1 = sin(x1);

figure % new figure window
plot(x1,y1)

hold on

x2 = linspace(-5,5);
y2 = 0.5*sin(x2);
plot(x2,y2)

hold off % reset hold state