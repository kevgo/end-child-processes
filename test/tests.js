describe("end-child-processes", () => {
  it("ends all child processes", () => {
    // start some child processes
    childProcess.exec("(read foo)");
    psTree(
      process.pid,
      N(children => {
        formatter.log(`${children.length - 1} child processes are running now`);
        done();
      })
    );
  });
});
