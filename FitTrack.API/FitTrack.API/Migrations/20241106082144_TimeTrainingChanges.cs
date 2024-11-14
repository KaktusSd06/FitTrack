using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class TimeTrainingChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "TrainingTimes");

            migrationBuilder.AddColumn<int>(
                name: "DurationInSeconds",
                table: "TrainingTimes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DurationInSeconds",
                table: "TrainingTimes");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Time",
                table: "TrainingTimes",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
